import React, { useEffect, useState } from 'react';
import { List } from 'immutable';
import { isNull, isEmpty, get } from 'lodash-es';
import Chart from '../../components/chart';
import { usePoll, useFetch } from '../../hooks';
import { TOTAL_X_TICKS, POLLING_INTERVALS, DOMAIN_FACTOR, MS_TO_S_FACTOR } from '../../utils/consts';
import Container from '../../components/container';
import { withResizeDetector } from 'react-resize-detector';
import { ENDPOINTS } from '../../utils/endpoint';
import { currentDataFormatter, historicalDataFormatter } from '../../utils/formatter';
import { ResizeDetectorChartProps } from '../interfaces';
import { convertTimestamp } from '../../utils/timeservice';
import { ChartPropsItem } from '../../components/chart/chart';
import Loader from '../../components/loader';
import { Label, ReferenceLine } from 'recharts';
import moment from 'moment';
import { rangeWithStep } from '../../utils/helpers';

const initialState: List<ChartPropsItem> = List([]);

const formatResult = (result: List<ChartPropsItem>): ChartPropsItem[] => {
    return result.toJS().map((resultItem) => ({ ...resultItem, time: convertTimestamp(resultItem.time) }));
};

const yDomainMinGenerator = (historicalFetchingResult: number, currentFetchingResult: number) => {
    return historicalFetchingResult > currentFetchingResult
        ? currentFetchingResult * DOMAIN_FACTOR.MIN
        : historicalFetchingResult * DOMAIN_FACTOR.MIN;
};

const yDomainMaxGenerator = (historicalFetchingResult: number, currentFetchingResult: number) => {
    return historicalFetchingResult > currentFetchingResult
        ? historicalFetchingResult * DOMAIN_FACTOR.MAX
        : currentFetchingResult * DOMAIN_FACTOR.MAX;
};

const getReferenceLineDataFromHistorical = (fetchingResult: ChartPropsItem[]) => {
    const lastHistoricalUSD = !isEmpty(fetchingResult) && Number(get(fetchingResult.slice(-1).pop(), ['USD']));

    return (
        lastHistoricalUSD && (
            <ReferenceLine y={lastHistoricalUSD} stroke="lightgrey">
                <Label value={lastHistoricalUSD} position="insideLeft" />
            </ReferenceLine>
        )
    );
};

const greenOrRed = (historicalFetchingResult: number, currentFetchingResult: number) =>
    historicalFetchingResult > currentFetchingResult ? '#fc034e' : '#03fc84';

const BitcoinChart = ({ width, height }: ResizeDetectorChartProps) => {
    const [chartData, setChartData] = useState(initialState);
    const [pollingResult, pollingLoading, pollingError, pollingStart] = usePoll(
        ENDPOINTS.CURRENT,
        POLLING_INTERVALS.CHART,
        currentDataFormatter,
    );
    const [fetchingResult, fetchingError] = useFetch(ENDPOINTS.CURRENT, currentDataFormatter);
    const [historicalFetchingResult] = useFetch(ENDPOINTS.HISTORICAL, historicalDataFormatter);

    useEffect(() => {
        if (chartData.toJS().length < TOTAL_X_TICKS) {
            rangeWithStep(0, 1, TOTAL_X_TICKS).map((next, index) =>
                setChartData((data) =>
                    data.push({
                        time: moment()
                            .utc()
                            .add((index * POLLING_INTERVALS.CHART) / MS_TO_S_FACTOR, 'seconds')
                            .format(),
                        USD: null,
                    }),
                ),
            );
        }
    }, []);

    useEffect(() => {
        if (!isNull(pollingResult) && !isNull(pollingResult[0]) && !isNull(pollingResult[1])) {
            setChartData((data) => {
                if (data.some((dataItem) => dataItem.USD === null)) {
                    data.set(
                        data.findIndex((dataItem) => dataItem.USD === null),
                        { time: pollingResult[0], USD: pollingResult[1] },
                    );
                } else if (data.size >= TOTAL_X_TICKS) {
                    return data.shift().push({ time: pollingResult[0], USD: pollingResult[1] });
                }

                /*return data.push({ time: pollingResult[0], USD: pollingResult[1] });*/
            });
        }
    }, [pollingResult]);

    useEffect(() => {
        if (!isEmpty(fetchingResult)) {
            setChartData((data) =>
                data.set(
                    data.findIndex((dataItem) => dataItem.USD === null),
                    { time: fetchingResult[0], USD: fetchingResult[1] },
                ),
            );
        }
    }, [fetchingResult]);

    useEffect(() => {
        (pollingStart as () => void)();
    }, []);

    return (
        <Container>
            {pollingError && <p className="error">{pollingError}</p>}
            {fetchingError && <p className="error">{fetchingError}</p>}
            {!isEmpty(chartData.toJS()) && !isEmpty(fetchingResult) && !isEmpty(historicalFetchingResult) ? (
                <>
                    <h1
                        style={{
                            color: `${greenOrRed(
                                get(historicalFetchingResult.slice(-1), '0.USD'),
                                get(chartData.toJS(), '0.USD'),
                            )}`,
                        }}
                    >
                        Current: {!pollingLoading && fetchingResult[1]}
                    </h1>
                    <Chart
                        data={formatResult(chartData)}
                        width={width}
                        height={height}
                        refLines={getReferenceLineDataFromHistorical(historicalFetchingResult)}
                        yDomainMinGenerator={yDomainMinGenerator(
                            get(historicalFetchingResult.slice(-1), '0.USD'),
                            get(chartData.toJS(), '0.USD'),
                        )}
                        yDomainMaxGenerator={yDomainMaxGenerator(
                            get(historicalFetchingResult.slice(-1), '0.USD'),
                            get(chartData.toJS(), '0.USD'),
                        )}
                        stroke={`${greenOrRed(
                            get(historicalFetchingResult.slice(-1), '0.USD'),
                            get(chartData.toJS(), '0.USD'),
                        )}`}
                    />
                </>
            ) : (
                <Loader />
            )}
        </Container>
    );
};

export default withResizeDetector(BitcoinChart);
