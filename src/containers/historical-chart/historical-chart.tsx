import React from 'react';
import Chart from '../../components/chart';
import { ChartPropsItem } from '../../components/chart/chart';
import { useFetch } from '../../hooks';
import Container from '../../components/container';
import { withResizeDetector } from 'react-resize-detector';
import { ENDPOINT } from '../../utils/endpoint';
import { historicalDataFormatter } from '../../utils/formatter';
import { ResizeDetectorChartProps } from '../interfaces';
import { convertTimestamp, TIMEFORMATS } from '../../utils/timeservice';

const formatXAxis = (tickItem: string) => {
    return convertTimestamp(tickItem, TIMEFORMATS.DAYS_ONLY);
};

const HistoricalChart = ({ width, height }: ResizeDetectorChartProps) => {
    const [result, error] = useFetch(ENDPOINT.HISTORICAL, historicalDataFormatter);

    return (
        <Container>
            <h1>Historical</h1>
            {error && <p className="error">{error}</p>}
            <Chart
                data={(result as unknown) as ChartPropsItem[]}
                width={width}
                height={height}
                xAxisFormatter={formatXAxis}
            />
        </Container>
    );
};

export default withResizeDetector(HistoricalChart);
