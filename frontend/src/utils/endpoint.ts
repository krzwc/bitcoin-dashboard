const BASEURL = 'http://localhost:8082';

export const ENDPOINTS = {
    CURRENT: BASEURL + '/current',
    HISTORICAL: BASEURL + '/historical',
    NEWS: BASEURL + '/news',
}

export const convertURL = (url: string): string => {
    const urlArr = url.split('=');

    return `${ENDPOINTS.NEWS}?page=${urlArr[urlArr.length - 1]}`;
};
