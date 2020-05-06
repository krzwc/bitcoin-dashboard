import React, { useEffect, useState } from 'react';
import { List } from 'immutable';
import { isNull, isEmpty, get } from 'lodash-es';
import Chart from '../../components/chart';
import { usePoll, useFetch } from '../../hooks';
import { TOTAL_X_TICKS, POLLING_INTERVALS, DOMAIN_FACTOR } from '../../utils/consts';
import Container from '../../components/container';
import { withResizeDetector } from 'react-resize-detector';
import { ENDPOINTS } from '../../utils/endpoint';
import { currentDataFormatter, historicalDataFormatter } from '../../utils/formatter';
import { ResizeDetectorChartProps } from '../interfaces';
import { convertTimestamp } from '../../utils/timeservice';
import { ChartPropsItem } from '../../components/chart/chart';
import Loader from '../../components/loader';
import { ReferenceLine } from 'recharts';

const initialState: List<ChartPropsItem> = List([]);

const formatResult = (result: List<ChartPropsItem>): ChartPropsItem[] => {
    return result.toJS().map((resultItem) => ({ ...resultItem, time: convertTimestamp(resultItem.time) }));
};

const domainGenerator = (historicalFetchingResult: number, currentFetchingResult: number, factor: number) => {
    return historicalFetchingResult > currentFetchingResult
        ? currentFetchingResult * factor
        : historicalFetchingResult * factor;
};

const getReferenceLineDataFromHistorical = (fetchingResult: ChartPropsItem[]) => {
    const lastHistoricalUSD = !isEmpty(fetchingResult) && Number(get(fetchingResult.slice(-1).pop(), ['USD']));

    return lastHistoricalUSD && <ReferenceLine y={lastHistoricalUSD} label={lastHistoricalUSD} stroke="lightgrey" />;
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
        if (!isNull(pollingResult) && !isNull(pollingResult[0]) && !isNull(pollingResult[1])) {
            setChartData((data) => {
                if (data.size >= TOTAL_X_TICKS) {
                    return data.shift().push({ time: pollingResult[0], USD: pollingResult[1] });
                }

                return data.push({ time: pollingResult[0], USD: pollingResult[1] });
            });
        }
    }, [pollingResult]);

    useEffect(() => {
        if (!isEmpty(fetchingResult)) {
            setChartData((data) => data.push({ time: fetchingResult[0], USD: fetchingResult[1] }));
        }
    }, [fetchingResult]);

    useEffect(() => {
        (pollingStart as () => void)();
    }, []);

    return (
        <Container>
            {pollingError && <p className="error">{pollingError}</p>}
            {fetchingError && <p className="error">{fetchingError}</p>}
            {!isEmpty(chartData.toJS()) && !isEmpty(historicalFetchingResult) ? (
                <>
                    {/*TODO: nie używac geta do tablicy*/}
                    <h1
                        style={{
                            color: `${greenOrRed(
                                get(historicalFetchingResult.slice(-1), '0.USD'),
                                get(chartData.toJS(), '0.USD'),
                            )}`,
                        }}
                    >
                        Current: {!pollingLoading && get(pollingResult, ['1'])}
                    </h1>
                    <Chart
                        data={formatResult(chartData)}
                        width={width}
                        height={height}
                        refLines={getReferenceLineDataFromHistorical(historicalFetchingResult)}
                        yDomainMinGenerator={domainGenerator(
                            get(historicalFetchingResult.slice(-1), '0.USD'),
                            get(chartData.toJS(), '0.USD'),
                            DOMAIN_FACTOR.MIN,
                        )}
                        yDomainMaxGenerator={domainGenerator(
                            get(historicalFetchingResult.slice(-1), '0.USD'),
                            get(chartData.toJS(), '0.USD'),
                            DOMAIN_FACTOR.MAX,
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
