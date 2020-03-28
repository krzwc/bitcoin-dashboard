import React, { FunctionComponent, useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { noop, get, mapValues } from 'lodash-es';

import {
    DashboardProps,
    DashboardGridItemsInclIPerBreakpoint,
    DashboardGridItemsPerBreakPoint,
    DashboardGridItem,
} from './interfaces';

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultProps = {
    isDraggable: true,
    isResizable: true,
    onLayoutChange: noop,
    autoSize: true,
    containerPadding: [0, 0] as [number, number],
};

const addI = (gridItems: DashboardGridItem[]) =>
    gridItems.map((item, index) => ({
        ...item,
        i: String(index),
    }));

const generateLayout = (gridItems: DashboardGridItemsPerBreakPoint) => {
    return mapValues(gridItems, addI);
};

const generateDOM = (layouts: DashboardGridItemsInclIPerBreakpoint) =>
    get(layouts, ['lg']).map(({ component, i }) => <div key={i}>{component}</div>);

const getLayoutsAndDomLayouts = (gridItems: DashboardGridItemsPerBreakPoint) => {
    const layouts = generateLayout(gridItems);

    return {
        layouts,
        domLayout: generateDOM(layouts),
    };
};

const Dashboard: FunctionComponent<DashboardProps> = ({ gridItems }) => {
    const [state, setState] = useState(getLayoutsAndDomLayouts(generateLayout(gridItems)));

    useEffect(() => {
        setState(getLayoutsAndDomLayouts(generateLayout(gridItems)));
    }, [gridItems]);

    return (
        <ResponsiveGridLayout
            className="dashboard"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            layouts={state.layouts}
            rowHeight={150}
            {...defaultProps}
        >
            {state.domLayout}
        </ResponsiveGridLayout>
    );
};

export default Dashboard;
