import { convertURL, ENDPOINTS } from '../endpoint';

const url =
    'https://cryptopanic.com/api/v1/posts/?auth_token=ajdajdawjdwajdajd&currencies=BTC&regions=en&public=true&page=2';

describe('URL helpers', () => {
    test('convertURL', () => {
        expect(convertURL(url)).toStrictEqual(`${ENDPOINTS.NEWS}?page=2`);
    });
});
