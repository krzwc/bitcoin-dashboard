import { ChartPropsItem } from '../../components/chart/chart';

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

const TOTAL_REFLINES = 8;

const rangeWithStep = (start: number, end: number, stepValue: number, steps: number) =>
    Array(steps)
        .fill(0)
        .map((v, i) => start + i * stepValue);

export const getRefLines = (arr: string[]) => {
    const start = Number(arr[0]);
    const end = Number(arr[arr.length - 1]);
    const stepValue = (end - start) / TOTAL_REFLINES;

    return [...rangeWithStep(start, end, stepValue, TOTAL_REFLINES), end];
};
