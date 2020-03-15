import React, { useEffect, useState } from 'react';
import { usePoll } from './hooks';
import Chart from './components/Chart';
import { isNull } from 'lodash-es';
import './App.scss';

const App = () => {
    const [chartData, setChartData] = useState([]);
    const [result, loading, error, start, stop] = usePoll();
    useEffect(() => {
        if (!isNull(result) && !isNull(result[0]) && !isNull(result[1])) {
            setChartData([...chartData, { time: result[0], USD: result[1] }]);
        }
    }, [result]);

    return (
        <div className="container">
            {console.log(chartData)}
            <h1>{!loading && result && result[1]}</h1>
            {error && <p className="error">{error}</p>}
            <Chart data={chartData} />
            <button onClick={start as () => void}>Start</button>
            <button onClick={stop as () => void}>Stop</button>
        </div>
    );
};

export default App;
