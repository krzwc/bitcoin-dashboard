import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, AxisDomain } from 'recharts';
// @ts-ignore
import theme from '../../style/_theme.scss';

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
    yDomainMinGenerator?: AxisDomain | ((dataMin: number) => AxisDomain) | number;
    yDomainMaxGenerator?: AxisDomain | ((dataMax: number) => AxisDomain) | number;
    xAxisFormatter?(tickItem: string): string;
}

const Chart = ({
    data,
    width,
    height,
    refLines,
    xAxisFormatter,
    yDomainMinGenerator,
    yDomainMaxGenerator,
    stroke,
}: ChartProps) => {
    return (
        <LineChart
            className="chart"
            width={width}
            height={height}
            data={data}
            margin={{ top: 20, right: 50, bottom: 20 }}
        >
            {refLines}
            <XAxis dataKey="time" tickFormatter={xAxisFormatter} stroke={theme.MEDIUM_GREY} />
            <YAxis type="number" domain={[yDomainMinGenerator, yDomainMaxGenerator]} hide={true} />
            <Tooltip />
            <Line type="linear" dataKey="USD" stroke={stroke ? stroke : theme.DARK} dot={false} strokeWidth={3} />
        </LineChart>
    );
};

export default Chart;
