import React, { useEffect, useState } from 'react';
import { List } from 'immutable';
import { isNull } from 'lodash-es';
import Chart from './components/Chart';
import { usePoll } from './hooks';
import './App.scss';
import { TOTAL_X_TICKS } from './utils/consts';

const initialState = List([]);

const App = () => {
    const [chartData, setChartData] = useState(initialState);
    const [result, loading, error, start, stop] = usePoll();
    useEffect(() => {
        if (!isNull(result) && !isNull(result[0]) && !isNull(result[1])) {
            setChartData((data) => {
                if (data.size >= TOTAL_X_TICKS) {
                    return data.shift().push({ time: result[0], USD: result[1] });
                }

                return data.push({ time: result[0], USD: result[1] });
            });
        }
    }, [result]);

    return (
        <div className="container">
            <h1>{!loading && result && result[1]}</h1>
            {error && <p className="error">{error}</p>}
            <Chart data={chartData.toJS()} />
            <button onClick={start as () => void}>Start</button>
            <button onClick={stop as () => void}>Stop</button>
        </div>
    );
};

export default App;
