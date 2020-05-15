export enum ENDPOINTS {
    CURRENT = 'https://api.coindesk.com/v1/bpi/currentprice.json',
    HISTORICAL = 'https://api.coindesk.com/v1/bpi/historical/close.json',
    NEWS = 'http://localhost:8082/news',
}

export const convertURL = (url: string): string => {
    const urlArr = url.split('=');

    return `${ENDPOINTS.NEWS}?page=${urlArr[urlArr.length - 1]}`;
};
