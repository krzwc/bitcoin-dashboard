import React from 'react';
import Dashboard from './components/dashboard';
import './style/app.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardGridItemsPerBreakPoint } from './components/dashboard/interfaces';

import BitcoinChart from './containers/bitcoin-chart';
import HistoricalChart from './containers/historical-chart';

const gridItemsArray: DashboardGridItemsPerBreakPoint = {
    lg: [
        { component: <BitcoinChart />, x: 0, y: 0, w: 6, h: 3 },
        { component: <HistoricalChart />, x: 6, y: 0, w: 6, h: 3 },
    ],
};

const App = () => {
    return <Dashboard gridItems={gridItemsArray} draggableHandle=".container" />;
};

export default App;
