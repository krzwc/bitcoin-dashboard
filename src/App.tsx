import React from 'react';
// Import { useFetch } from './hooks';
import { usePoll } from './hooks';
import './App.scss';
import Timeout = NodeJS.Timeout;

const App = () => {
    const [result, loading, error, timer] = usePoll();

    return (
        <div className="container">
            <h1>{!loading && result}</h1>
            {error && <p className="error">{error}</p>}
            <button onClick={() => clearInterval(timer as Timeout)}>Clear</button>
        </div>
    );
};

export default App;
