import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, AxisDomain } from 'recharts';
// @ts-ignore
import theme from 'style/_theme.scss';
// @ts-ignore
import variables from 'style/_variables.scss';

export interface ChartPropsItem {
    time: string;
    USD: number;
}

interface ChartProps {
    data: ChartPropsItem[];
    width?: number;
    height?: number;
    refLines?: JSX.Element[] | JSX.Element;
    stroke?: string;
    hideYAxis?: boolean;
    yDomainMinGenerator?: AxisDomain | ((dataMin: number) => AxisDomain) | number;
    yDomainMaxGenerator?: AxisDomain | ((dataMax: number) => AxisDomain) | number;
    xAxisFormatter?(tickItem: string): string;
}

export const yAxisFormatter = (value: number) => value.toFixed(0);

const Chart = ({
    data,
    width,
    height,
    refLines,
    xAxisFormatter,
    yDomainMinGenerator,
    yDomainMaxGenerator,
    stroke,
    hideYAxis = true,
}: ChartProps) => {
    return (
        <LineChart
            className="chart"
            width={width}
            height={height}
            data={data}
            margin={{
                left: hideYAxis ? Number(variables.CHART_LEFT_RIGHT_PADDING) : 0,
                right: Number(variables.CHART_LEFT_RIGHT_PADDING),
                bottom: 20,
            }}
        >
            {refLines}
            <XAxis
                dataKey="time"
                tickFormatter={xAxisFormatter}
                stroke={theme.MEDIUM_GREY}
                tick={{ fontSize: variables.FONT_SIZE_REGULAR }}
            />
            <YAxis
                type="number"
                tickFormatter={yAxisFormatter}
                domain={[yDomainMinGenerator, yDomainMaxGenerator]}
                stroke={theme.MEDIUM_GREY}
                tick={{ fontSize: variables.FONT_SIZE_REGULAR }}
                hide={hideYAxis}
            />
            <Tooltip />
            <Line type="linear" dataKey="USD" stroke={stroke ? stroke : theme.DARK} dot={false} strokeWidth={3} />
        </LineChart>
    );
};

export default Chart;
