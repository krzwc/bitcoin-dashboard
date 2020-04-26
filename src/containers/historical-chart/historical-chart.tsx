import React from 'react';
import Chart from '../../components/chart';
import { ChartPropsItem } from '../../components/chart/chart';
import { useFetch } from '../../hooks';
import Container from '../../components/container';
import { withResizeDetector } from 'react-resize-detector';
import { ENDPOINTS } from '../../utils/endpoint';
import { historicalDataFormatter } from '../../utils/formatter';
import { ResizeDetectorChartProps } from '../interfaces';
import { convertTimestamp, TIMEFORMATS } from '../../utils/timeservice';
import Loader from '../../components/loader';
import { isEmpty } from 'lodash-es';
import { getRefLines, dataBoundries } from './helpers';
import { ReferenceLine } from 'recharts';

const formatXAxis = (tickItem: string) => {
    return convertTimestamp(tickItem, TIMEFORMATS.DAYS_ONLY);
};

const HistoricalChart = ({ width, height }: ResizeDetectorChartProps) => {
    const [result, error] = useFetch(ENDPOINTS.HISTORICAL, historicalDataFormatter);
    const refLines =
        !isEmpty(result) &&
        getRefLines(dataBoundries(result)).map((refLine) => {
            return <ReferenceLine key={refLine} y={refLine} label={refLine} stroke="lightgrey" />;
        });

    return (
        <Container>
            <h1>Historical</h1>
            {error && <p className="error">{error}</p>}
            {!isEmpty(result) ? (
                <Chart
                    data={(result as unknown) as ChartPropsItem[]}
                    width={width}
                    height={height}
                    xAxisFormatter={formatXAxis}
                    refLines={refLines}
                />
            ) : (
                <Loader />
            )}
        </Container>
    );
};

export default withResizeDetector(HistoricalChart);
