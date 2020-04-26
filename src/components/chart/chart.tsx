import React from 'react';

import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip } from 'recharts';
import { getRefLines, dataBoundries } from './helpers';

export interface ChartPropsItem {
    time: string;
    USD: number;
}

interface ChartProps {
    data: ChartPropsItem[];
    width: number;
    height: number;
    xAxisFormatter(tickItem: string): string;
}

const Chart = ({ data, width, height, xAxisFormatter }: ChartProps) => {
    const refLines =
        data.length < 10 ? (
            <ReferenceLine />
        ) : (
            getRefLines(dataBoundries(data)).map((refLine) => {
                return <ReferenceLine key={refLine} y={refLine} label={refLine} stroke="lightgrey" />;
            })
        );

    return (
        <LineChart
            className="chart"
            width={width}
            height={height}
            data={data}
            margin={{ top: 20, right: 50, bottom: 20 }}
        >
            {refLines}
            <XAxis dataKey="time" tickFormatter={xAxisFormatter} />

            {/* TODO: Yaxis dla current musi być dynamiczny, musi byc przekazywany propsem */}
            <YAxis type="number" domain={[(dataMin) => (dataMin * 0.95), (dataMax) => (dataMax * 1.05)]} hide={true} />
            <Tooltip />
            <Line type="linear" dataKey="USD" stroke="#8884d8" dot={false} />
        </LineChart>
    );
};

export default Chart;
