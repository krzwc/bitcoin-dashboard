import React, { FunctionComponent, useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { noop } from 'lodash-es';
import { withResizeDetector } from 'react-resize-detector';
import { DashboardGridItem, DashboardProps } from './interfaces';

const defaultProps = {
    isDraggable: true,
    isResizable: true,
    onLayoutChange: noop,
    cols: 12,
    autoSize: true,
    containerPadding: [0, 0] as [number, number],
    width: 1,
};

const generateLayout = (gridItems: DashboardGridItem[]) =>
    gridItems.map((item, index) => ({
        ...item,
        i: String(index),
    }));

const generateDOM = (layout: DashboardGridItem[]) => layout.map(({ component, i }) => <div key={i}>{component}</div>);

const getLayoutAndDomLayout = (gridItems: DashboardGridItem[]) => {
    const layout = generateLayout(gridItems);

    return {
        layout,
        domLayout: generateDOM(layout),
    };
};

const Dashboard: FunctionComponent<DashboardProps> = ({ gridItems }) => {
    const [state, setState] = useState(getLayoutAndDomLayout(generateLayout(gridItems)));

    useEffect(() => {
        setState(getLayoutAndDomLayout(generateLayout(gridItems)));
    }, [gridItems]);

    return (
        <GridLayout className="dashboard" layout={state.layout} rowHeight={150} {...defaultProps}>
            {state.domLayout}
        </GridLayout>
    );
};

export default withResizeDetector(Dashboard);
