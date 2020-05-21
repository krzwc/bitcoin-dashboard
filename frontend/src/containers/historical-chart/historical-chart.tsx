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
import { AxisDomain, ReferenceLine, Label } from 'recharts';
import { DOMAIN_FACTOR } from '../../utils/consts';
// @ts-ignore
import theme from '../../style/_theme.scss';

const formatXAxis = (tickItem: string) => {
    return convertTimestamp(tickItem, TIMEFORMATS.DAYS_ONLY);
};

const yDomainMinGenerator = (dataMin: number): AxisDomain => dataMin * DOMAIN_FACTOR.MIN;

const yDomainMaxGenerator = (dataMax: number): AxisDomain => dataMax * DOMAIN_FACTOR.MAX;

const HistoricalChart = ({ width, height }: ResizeDetectorChartProps) => {
    const [result, error] = useFetch(ENDPOINTS.HISTORICAL, historicalDataFormatter);
    const refLines =
        !isEmpty(result) &&
        getRefLines(dataBoundries(result)).map((refLine) => {
            return (
                <ReferenceLine key={refLine} y={refLine} stroke={theme.LIGHT_GREY}>
                    <Label
                        value={refLine}
                        position="insideLeft"
                        stroke={theme.MEDIUM_GREY}
                        fill={theme.MEDIUM_GREY}
                        strokeWidth={0.5}
                    />
                </ReferenceLine>
            );
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
                    yDomainMinGenerator={yDomainMinGenerator}
                    yDomainMaxGenerator={yDomainMaxGenerator}
                />
            ) : (
                <Loader />
            )}
        </Container>
    );
};

export default withResizeDetector(HistoricalChart);
