import { ReactNode } from 'react';
import { Layout, ReactGridLayoutProps } from 'react-grid-layout';

export interface DashboardGridItem extends Layout {
    component: ReactNode;
}

export interface DashboardProps extends ReactGridLayoutProps {
    gridItems: DashboardGridItem[];
    height: number;
    width: number;
}
