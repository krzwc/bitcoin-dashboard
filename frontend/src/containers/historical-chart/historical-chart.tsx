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
import { isEmpty, get, last } from 'lodash-es';
import { getRefLines, dataBoundries } from './helpers';
import { AxisDomain, ReferenceLine, Label } from 'recharts';
import { DOMAIN_FACTOR } from '../../utils/consts';
import { presentDiff, presentPercentage } from '../../utils/helpers';
// @ts-ignore
import theme from '../../style/_theme.scss';
// @ts-ignore
import variables from '../../style/_variables.scss';

const formatXAxis = (tickItem: string) => {
    return convertTimestamp(tickItem, TIMEFORMATS.DAYS_ONLY);
};

const greenOrRed = (historicalFetchingResult: number, currentFetchingResult: number) =>
    historicalFetchingResult > currentFetchingResult ? theme.RED : theme.GREEN;

const yDomainMinGenerator = (dataMin: number): AxisDomain => dataMin * DOMAIN_FACTOR.MIN;

const yDomainMaxGenerator = (dataMax: number): AxisDomain => dataMax * DOMAIN_FACTOR.MAX;

const HistoricalChart = ({ width, height }: ResizeDetectorChartProps) => {
    const [result] = useFetch(ENDPOINTS.HISTORICAL, historicalDataFormatter);
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
                        fontSize={variables.FONT_SIZE_REGULAR}
                    />
                </ReferenceLine>
            );
        });
    // tslint:disable-next-line:binary-expression-operand-order
    const getStyle = width ? { width: width - 2 * variables.CHART_LEFT_RIGHT_PADDING } : {};

    return (
        <Container>
            {!isEmpty(result) && width ? (
                <>
                    <div className="header" style={getStyle}>
                        <h1>30d</h1>
                        <h3
                            style={{
                                color: `${greenOrRed(get(result[0], 'USD'), get(last(result), 'USD'))}`,
                            }}
                        >
                            {presentDiff(get(result[0], 'USD'), get(last(result), 'USD'))}{' '}
                            {`(${presentPercentage(get(result[0], 'USD'), get(last(result), 'USD'))})`}
                        </h3>
                    </div>
                    <Chart
                        data={(result as unknown) as ChartPropsItem[]}
                        width={width}
                        height={height - variables.CONTAINER_HEADER_HEIGHT}
                        xAxisFormatter={formatXAxis}
                        refLines={refLines}
                        yDomainMinGenerator={yDomainMinGenerator}
                        yDomainMaxGenerator={yDomainMaxGenerator}
                    />
                </>
            ) : (
                <Loader />
            )}
        </Container>
    );
};

export default withResizeDetector(HistoricalChart);
