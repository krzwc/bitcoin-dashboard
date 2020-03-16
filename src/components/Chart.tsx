import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { convertTimestamp } from '../utils/timeservice';

interface ChartPropsItem {
    time: string;
    USD: number;
}

interface ChartProps {
    data: ChartPropsItem[];
}

const covertData = (data: ChartPropsItem[]) => {
    return data.map((tick) => ({ ...tick, time: convertTimestamp(tick.time) }));
};

const Chart = ({ data }: ChartProps) => {
    return (
        <LineChart
            width={500}
            height={300}
            data={covertData(data)}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis type="number" domain={['dataMin', 'dataMax']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="USD" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default Chart;
