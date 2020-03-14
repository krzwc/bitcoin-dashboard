import React from 'react';
import { useFetch } from './hooks';
import './App.scss';

const App = () => {
    const [result, loading, error] = useFetch();

    return (
        <div className="container">
            <h1>{!loading && result}</h1>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default App;
