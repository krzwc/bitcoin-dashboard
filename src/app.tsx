import React from 'react';
import Dashboard from './components/dashboard';
import './style/app.scss';
import { DashboardGridItem } from './components/dashboard/interfaces';

import BitcoinChart from './containers/bitcoin-chart';

const gridItemsArray: DashboardGridItem[] = [
    { component: <BitcoinChart />, i: '0', x: 0, y: 0, w: 6, h: 3 },
    { component: <BitcoinChart />, i: '1', x: 6, y: 0, w: 6, h: 3 },
];

const App = () => {
    return <Dashboard gridItems={gridItemsArray} draggableHandle=".container" />;
};

export default App;
