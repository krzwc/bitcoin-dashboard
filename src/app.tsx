import React from 'react';
import Dashboard from './views/dashboard';
import './style/app.scss';
import { DashboardGridItem } from './views/dashboard/interfaces';

import BitcoinChart from './views/bitcoin-chart';

const gridItemsArray: DashboardGridItem[] = [{ component: <BitcoinChart />, i: '0', x: 0, y: 0, w: 12, h: 3 }];

const App = () => {
    return <Dashboard gridItems={gridItemsArray} />;
};

export default App;
