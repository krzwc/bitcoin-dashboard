import React from 'react';
import { usePoll } from './hooks';
import './App.scss';

const App = () => {
    const [result, loading, error, start, stop] = usePoll();

    return (
        <div className="container">
            <h1>{!loading && result}</h1>
            {error && <p className="error">{error}</p>}
            <button onClick={start as () => void}>Start</button>
            <button onClick={stop as () => void}>Stop</button>
        </div>
    );
};

export default App;
