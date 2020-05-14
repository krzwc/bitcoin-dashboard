import { get } from 'lodash-es';
import { ChartPropsItem } from '../components/chart/chart';
import { NewsFeedProps } from '../components/news-feed/news-feed';
import { CurrentData, HistoricalData, NewsData } from '../types/interfaces';

export const currentDataFormatter = (response: CurrentData): [string, number] => [
    get(response, ['time', 'updatedISO'], null),
    get(response, ['bpi', 'EUR', 'rate_float'], null),
];

export const historicalDataFormatter = (response: HistoricalData): ChartPropsItem[] =>
    Object.entries(get(response, ['bpi'])).map((item) => ({ time: item[0], USD: item[1] }));

export const newsDataFormatter = (response: NewsData): NewsFeedProps => response;
