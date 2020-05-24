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
import { rangeWithStep, presentDiff, presentPercentage } from '../../utils/helpers';
// @ts-ignore
import theme from '../../style/_theme.scss';
// @ts-ignore
import variables from '../../style/_variables.scss';

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
            <ReferenceLine y={lastHistoricalUSD} stroke={theme.LIGHT_GREY}>
                <Label
                    value={lastHistoricalUSD}
                    position="insideLeft"
                    stroke={theme.MEDIUM_GREY}
                    fill={theme.MEDIUM_GREY}
                    strokeWidth={0.5}
                    fontSize={variables.FONT_SIZE_REGULAR}
                />
            </ReferenceLine>
        )
    );
};

const greenOrRed = (historicalFetchingResult: number, currentFetchingResult: number) =>
    historicalFetchingResult > currentFetchingResult ? theme.RED : theme.GREEN;

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
                    return data.set(
                        data.findIndex((dataItem) => dataItem.USD === null),
                        { time: pollingResult[0], USD: pollingResult[1] },
                    );
                } else if (data.size >= TOTAL_X_TICKS) {
                    return data.shift().push({ time: pollingResult[0], USD: pollingResult[1] });
                }
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
                    {/* tslint:disable-next-line:binary-expression-operand-order */}
                    <div className="header" style={{ width: width - 2 * variables.CHART_LEFT_RIGHT_PADDING }}>
                        <h1>5min</h1>
                        <h3>
                            {!pollingLoading && `$${get(chartData.toJS(), '0.USD')}`}{' '}
                            <span
                                style={{
                                    color: `${greenOrRed(
                                        get(historicalFetchingResult.slice(-1), '0.USD'),
                                        get(chartData.toJS(), '0.USD'),
                                    )}`,
                                }}
                            >
                                {!pollingLoading &&
                                    presentDiff(
                                        get(historicalFetchingResult.slice(-1), '0.USD'),
                                        get(chartData.toJS(), '0.USD'),
                                    )}{' '}
                                {!pollingLoading &&
                                    `(${presentPercentage(
                                        get(historicalFetchingResult.slice(-1), '0.USD'),
                                        get(chartData.toJS(), '0.USD'),
                                    )})`}
                            </span>
                        </h3>
                    </div>
                    <Chart
                        data={formatResult(chartData)}
                        width={width}
                        height={height - variables.CONTAINER_HEADER_HEIGHT}
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
