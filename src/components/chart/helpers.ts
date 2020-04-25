import { ChartPropsItem } from './chart';

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

const STEP = 4;

export const getRefLines = (arr: string[]) => {
    const start = Number(arr[0]);
    const end = Number(arr[arr.length - 1]);
    const step = (end - start) / STEP;
    let nextIndex = 1;
    const result = [start];

    while (result[nextIndex - 1] + step < end) {
        result.splice(nextIndex, 0, result[nextIndex - 1] + step);

        nextIndex++;
    }
    result.push(end);

    return result;
};
