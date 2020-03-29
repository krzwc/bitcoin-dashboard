import { get } from 'lodash-es';
import { ChartPropsItem } from '../components/chart/chart';

export const currentDataFormatter = (response: any): [string, number] => [
    get(response, ['time', 'updatedISO'], null),
    get(response, ['bpi', 'EUR', 'rate_float'], null),
];

export const historicalDataFormatter = (response: any): ChartPropsItem[] =>
    Object.entries(get(response, ['bpi'])).map((item: any) => ({ time: item[0], USD: item[1] }));
