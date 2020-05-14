import { ReactNode } from 'react';
import { Layout, Layouts, ReactGridLayoutProps } from 'react-grid-layout';

export interface DashboardGridItemsInclIPerBreakpoint extends Layouts {
    [P: string]: DashboardGridItemsInclI[];
}

export interface DashboardGridItemsInclI extends Layout {
    component: ReactNode;
}

export interface DashboardGridItemsPerBreakPoint {
    [P: string]: DashboardGridItem[];
}

export interface DashboardGridItem extends Omit<Layout, 'i'> {
    component: ReactNode;
}

export interface DashboardProps extends ReactGridLayoutProps {
    gridItems: DashboardGridItemsPerBreakPoint;
    /*height: number;
    width: number;*/
}
