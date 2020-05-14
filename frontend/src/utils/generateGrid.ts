import { ReactNode } from 'react';
import { DashboardGridItemsPerBreakPoint, DashboardGridItem } from '../components/dashboard/interfaces';
import { Layout } from 'react-grid-layout';

interface LayoutObj {
    [P: string]: Omit<Layout, 'i'>[];
}

export default (componentArray: ReactNode[], layout: LayoutObj): DashboardGridItemsPerBreakPoint => {
    return Object.fromEntries(
        Object.entries(layout).map((layoutItem): [string, DashboardGridItem[]] => {
            return [
                layoutItem[0],
                componentArray.map(
                    (component, index): DashboardGridItem => {
                        return {
                            component,
                            ...layoutItem[1][index],
                        };
                    },
                ),
            ];
        }),
    );
};
