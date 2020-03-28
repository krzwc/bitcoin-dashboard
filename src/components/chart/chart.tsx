import React from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { convertTimestamp } from '../../utils/timeservice';

interface ChartPropsItem {
    time: string;
    USD: number;
}

interface ChartProps {
    data: ChartPropsItem[];
    width: number;
    height: number;
}

const formatXAxis = (tickItem: string) => {
    return convertTimestamp(tickItem);
};

const Chart = ({ data, width, height }: ChartProps) => {
    return (
        <LineChart
            className="chart"
            width={width}
            height={height}
            data={data}
            margin={{ top: 20, right: 50, bottom: 20 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tickFormatter={formatXAxis} />
            <YAxis type="number" domain={['dataMin', 'dataMax']} />
            <Tooltip />
            <Line type="monotone" dataKey="USD" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default Chart;
