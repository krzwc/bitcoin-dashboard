import React from 'react';
import Dashboard from './components/dashboard';
import './style/app.scss';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { DashboardGridItemsPerBreakPoint } from './components/dashboard/interfaces';
// import generateGrid from './utils/generateGrid';

import BitcoinChart from './containers/bitcoin-chart';
import HistoricalChart from './containers/historical-chart';
import BitcoinNewsFeed from './containers/bitcoin-news-feed';

const gridItemsArray: DashboardGridItemsPerBreakPoint = {
    lg: [
        { component: <BitcoinChart />, x: 0, y: 0, w: 6, h: 3 },
        { component: <HistoricalChart />, x: 6, y: 0, w: 6, h: 3 },
        { component: <BitcoinNewsFeed />, x: 0, y: 6, w: 12, h: 3 },
    ],
    md: [
        { component: <BitcoinChart />, x: 0, y: 0, w: 5, h: 3 },
        { component: <HistoricalChart />, x: 0, y: 3, w: 5, h: 3 },
        { component: <BitcoinNewsFeed />, x: 5, y: 0, w: 5, h: 6 },
    ],
    sm: [
        { component: <BitcoinChart />, x: 0, y: 0, w: 3, h: 3 },
        { component: <HistoricalChart />, x: 0, y: 3, w: 3, h: 3 },
        { component: <BitcoinNewsFeed />, x: 3, y: 0, w: 3, h: 6 },
    ],
    xs: [
        { component: <BitcoinChart />, x: 0, y: 0, w: 4, h: 3 },
        { component: <HistoricalChart />, x: 0, y: 3, w: 4, h: 3 },
        { component: <BitcoinNewsFeed />, x: 0, y: 6, w: 4, h: 3 },
    ],
    xxs: [
        { component: <BitcoinChart />, x: 0, y: 0, w: 2, h: 3 },
        { component: <HistoricalChart />, x: 0, y: 3, w: 2, h: 3 },
        { component: <BitcoinNewsFeed />, x: 0, y: 6, w: 2, h: 3 },
    ],
};

/*
const components = [<BitcoinChart key={1} />, <HistoricalChart key={2} />, <BitcoinNewsFeed key={3} />];
*/
/*
const layout = {
    lg: [
        { x: 0, y: 0, w: 6, h: 3 },
        { x: 6, y: 0, w: 6, h: 3 },
        { x: 0, y: 6, w: 12, h: 3 },
    ],
    md: [
        { x: 0, y: 0, w: 5, h: 3 },
        { x: 0, y: 3, w: 5, h: 3 },
        { x: 5, y: 0, w: 5, h: 6 },
    ],
    sm: [
        { x: 0, y: 0, w: 3, h: 3 },
        { x: 0, y: 3, w: 3, h: 3 },
        { x: 3, y: 0, w: 3, h: 6 },
    ],
    xs: [
        { x: 0, y: 0, w: 4, h: 3 },
        { x: 0, y: 3, w: 4, h: 3 },
        { x: 0, y: 6, w: 4, h: 3 },
    ],
    xxs: [
        { x: 0, y: 0, w: 2, h: 3 },
        { x: 0, y: 3, w: 2, h: 3 },
        { x: 0, y: 6, w: 2, h: 3 },
    ],
};*/

const App = () => {
    return (
        <>
            <Dashboard gridItems={gridItemsArray} draggableHandle=".container" />
            {/*{console.log((generateGrid(components, layout) as unknown) as DashboardGridItemsPerBreakPoint}*/}
        </>
    );
};

export default App;
