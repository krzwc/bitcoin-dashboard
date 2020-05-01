import React, { useEffect, useState } from 'react';
import { List } from 'immutable';
import { isNull, isEmpty, get } from 'lodash-es';
import Chart from '../../components/chart';
import { usePoll, useFetch } from '../../hooks';
import { TOTAL_X_TICKS, POLLING_INTERVALS } from '../../utils/consts';
import Container from '../../components/container';
import { withResizeDetector } from 'react-resize-detector';
import { ENDPOINTS } from '../../utils/endpoint';
import { currentDataFormatter, historicalDataFormatter } from '../../utils/formatter';
import { ResizeDetectorChartProps } from '../interfaces';
import { convertTimestamp } from '../../utils/timeservice';
import { ChartPropsItem } from '../../components/chart/chart';
import Loader from '../../components/loader';
import { /*AxisDomain,*/ ReferenceLine } from 'recharts';

const initialState: List<ChartPropsItem> = List([]);

const formatXAxis = (tickItem: string) => {
    return convertTimestamp(tickItem);
};

// const yDomainMinGenerator = (histricalFetchingResult, currentFetchingResult) => {
//
//     return (dataMin: number): AxisDomain => dataMin * 0.95;
// }
//
// const yDomainMaxGenerator = (dataMax: number): AxisDomain => dataMax * 1.05;

const getReferenceLineDataFromHistorical = (fetchingResult: ChartPropsItem[]) => {
    const lastHistoricalUSD = !isEmpty(fetchingResult) && Number(get(fetchingResult.slice(-1).pop(), ['USD']));

    return lastHistoricalUSD && <ReferenceLine y={lastHistoricalUSD} label={lastHistoricalUSD} stroke="lightgrey" />;
};

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
            {/*{console.log(!isEmpty(historicalFetchingResult) && Number(get(historicalFetchingResult.slice(-1).pop(), ['USD'])))}*/}
            <h1>Current: {!pollingLoading && get(pollingResult, ['1'])}</h1>
            {pollingError && <p className="error">{pollingError}</p>}
            {fetchingError && <p className="error">{fetchingError}</p>}
            {!isEmpty(chartData.toJS()) ? (
                <Chart
                    data={chartData.toJS()}
                    width={width}
                    height={height}
                    xAxisFormatter={formatXAxis}
                    refLines={getReferenceLineDataFromHistorical(historicalFetchingResult)}
                    yDomainMinGenerator="auto"
                    yDomainMaxGenerator="auto"
                />
            ) : (
                <Loader />
            )}
        </Container>
    );
};

export default withResizeDetector(BitcoinChart);
