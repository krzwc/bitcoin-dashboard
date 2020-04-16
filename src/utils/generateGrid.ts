import { ReactNode } from 'react';
// import { DashboardGridItemsPerBreakPoint } from '../components/dashboard/interfaces';

type sizes = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';
type layoutKey = 'x' | 'y' | 'w' | 'h';
type layoutObj = {
    [key in layoutKey]: number;
};
type Layout = {
    [key in sizes]: layoutObj[];
};

export default (componentArray: ReactNode[], layout: Layout) => {
    return Object.entries(layout).map((layoutItem) => {
        return {
            [layoutItem[0]]: componentArray.map((component, index) => {
                return {
                    component,
                    ...layoutItem[1][index],
                };
            }),
        };
    });
};
