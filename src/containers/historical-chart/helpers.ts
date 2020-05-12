import { ChartPropsItem } from '../../components/chart/chart';
import { TOTAL_REFLINES } from '../../utils/consts';
import { rangeWithStep } from '../../utils/helpers';

export const dataBoundries = (data: ChartPropsItem[]) => {
    const dataArr = data.map((dataItem) => Number(dataItem.USD));
    const bounds = [Math.min(...dataArr), Math.max(...dataArr)];

    const firstOfFirst = bounds[0].toString()[0];

    const firstOfSecond = Number(bounds[1].toString()[0]) + 1;
    const tail = (num: number) =>
        Array.from(num.toString().slice(1))
            .fill('0')
            .join('');

    return [firstOfFirst + tail(Math.floor(bounds[0])), firstOfSecond + tail(Math.floor(bounds[1]))];
};

export const getRefLines = (arr: string[]) => {
    const start = Number(arr[0]);
    const end = Number(arr[arr.length - 1]);
    const stepValue = (end - start) / TOTAL_REFLINES;

    return [...rangeWithStep(start, stepValue, TOTAL_REFLINES), end];
};
