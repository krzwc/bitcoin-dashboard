import { ChartPropsItem } from 'components/chart/chart';
import { TOTAL_REFLINES } from 'utils/consts';
import { rangeWithStep } from 'utils/helpers';

export const dataBoundries = (data: ChartPropsItem[]) => {
    const dataArr = data.map((dataItem) => Number(dataItem.USD));
    const bounds = [Math.min(...dataArr), Math.max(...dataArr)];

    return [Math.floor(bounds[0] / 1000) * 1000, Math.ceil(bounds[1] / 1000) * 1000];
};

export const getRefLines = (arr: number[]) => {
    const start = arr[0];
    const end = arr[arr.length - 1];
    const stepValue = (end - start) / TOTAL_REFLINES;

    return [...rangeWithStep(start, stepValue, TOTAL_REFLINES), end];
};
