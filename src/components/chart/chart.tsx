import React from 'react';

import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip } from 'recharts';

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
    const refLinesArr = [6000, 6500, 7000, 7500]
    const refLines =
        data.length === 1 ? (
            <ReferenceLine y={data[0].USD} stroke="lightgrey" />
        ) : (
            refLinesArr.map((refLine) => <ReferenceLine key={refLine} y={refLine} label={refLine} stroke="lightgrey" />)
        );

    return (
        <LineChart
            className="chart"
            width={width}
            height={height}
            data={data}
            margin={{ top: 20, right: 50, bottom: 20 }}
        >
            {/*<CartesianGrid horizontal={true} vertical={false} />*/}
            {refLines}
            <XAxis dataKey="time" tickFormatter={xAxisFormatter} />
            <YAxis type="number" domain={['dataMin-100', 'dataMax+100']} hide={true} />

            <Tooltip />
            <Line type="linear" dataKey="USD" stroke="#8884d8" dot={false} />
        </LineChart>
    );
};

export default Chart;
