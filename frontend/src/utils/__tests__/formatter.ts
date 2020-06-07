import { currentDataFormatter, historicalDataFormatter, newsDataFormatter } from '../formatter';
import { chartDataMock } from 'components/chart/__tests__/chart';
// @ts-ignore
import { CURRENCIES } from 'types/interfaces';

const currentData = {
    time: {
        updated: 'May 31, 2020 07:37:00 UTC',
        updatedISO: '2020-05-31T07:37:00+00:00',
        updateduk: 'May 31, 2020 at 08:37 BST',
    },
    disclaimer:
        'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
    chartName: 'Bitcoin',
    bpi: {
        USD: {
            code: 'USD' as CURRENCIES.USD,
            symbol: '&#36;',
            rate: '9,579.0017',
            description: 'United States Dollar',
            rate_float: 9579.0017,
        },
        GBP: {
            code: 'GBP' as CURRENCIES.GBP,
            symbol: '&pound;',
            rate: '7,760.3611',
            description: 'British Pound Sterling',
            rate_float: 7760.3611,
        },
        EUR: {
            code: 'EUR' as CURRENCIES.EUR,
            symbol: '&euro;',
            rate: '8,625.8431',
            description: 'Euro',
            rate_float: 8625.8431,
        },
    },
};

const historicalData = {
    bpi: {
        '2020-04-30': 8740.75,
        '2020-05-01': 8771.5725,
        '2020-05-02': 8891.445,
        '2020-05-03': 8819.01,
        '2020-05-04': 8801.36,
    },
    disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.',
    time: { updated: 'May 31, 2020 00:03:00 UTC', updatedISO: '2020-05-31T00:03:00+00:00' },
};

export const newsData = {
    count: 200,
    next:
        'https://cryptopanic.com/api/v1/posts/?auth_token=f39e3c4c154353a7352f963968c90e5d88616555&currencies=BTC&regions=en&public=true&page=2',
    previous: null as string,
    results: [
        {
            kind: 'news',
            domain: 'cointelegraph.com',
            source: { title: 'CoinTelegraph', region: 'en', domain: 'cointelegraph.com', path: null as string },
            title: 'Crypto and Fiat Currencies Are Worlds Apart, Here Are the Reasons Why',
            published_at: '2020-05-31T07:15:00Z',
            slug: 'Crypto-and-Fiat-Currencies-Are-Worlds-Apart-Here-Are-the-Reasons-Why',
            currencies: [
                { code: 'BTC', title: 'Bitcoin', slug: 'bitcoin', url: 'https://cryptopanic.com/news/bitcoin/' },
            ],
            id: 8953536,
            url:
                'https://cryptopanic.com/news/8953536/Crypto-and-Fiat-Currencies-Are-Worlds-Apart-Here-Are-the-Reasons-Why',
            created_at: '2020-05-31T07:15:00Z',
            votes: {
                negative: 0,
                positive: 0,
                important: 0,
                liked: 0,
                disliked: 0,
                lol: 0,
                toxic: 0,
                saved: 0,
                comments: 0,
            },
        },
        {
            kind: 'news',
            domain: 'dailyhodl.com',
            source: { title: 'The Daily Hodl', region: 'en', domain: 'dailyhodl.com', path: null },
            title: 'Altcoins Outpace Bitcoin in Broad Crypto Rally: Cardano and Ethereum Biggest Gainers',
            published_at: '2020-05-31T07:04:03Z',
            slug: 'Altcoins-Outpace-Bitcoin-in-Broad-Crypto-Rally-Cardano-and-Ethereum-Biggest-Gainers',
            currencies: [
                { code: 'BTC', title: 'Bitcoin', slug: 'bitcoin', url: 'https://cryptopanic.com/news/bitcoin/' },
                { code: 'ETH', title: 'Ethereum', slug: 'ethereum', url: 'https://cryptopanic.com/news/ethereum/' },
                { code: 'ADA', title: 'Cardano', slug: 'cardano', url: 'https://cryptopanic.com/news/cardano/' },
            ],
            id: 8953473,
            url:
                'https://cryptopanic.com/news/8953473/Altcoins-Outpace-Bitcoin-in-Broad-Crypto-Rally-Cardano-and-Ethereum-Biggest-Gainers',
            created_at: '2020-05-31T07:04:03Z',
            votes: {
                negative: 0,
                positive: 0,
                important: 0,
                liked: 0,
                disliked: 0,
                lol: 0,
                toxic: 0,
                saved: 0,
                comments: 0,
            },
        },
        {
            kind: 'news',
            domain: 'beincrypto.com',
            source: { title: 'BeInCrypto', region: 'en', domain: 'beincrypto.com', path: null as string },
            title: 'Roger Ver Claims Meeting with Head of State Regarding Bitcoin Cash National Adoption',
            published_at: '2020-05-31T06:40:55Z',
            slug: 'Roger-Ver-Claims-Meeting-with-Head-of-State-Regarding-Bitcoin-Cash-National-Adoption',
            currencies: [
                { code: 'BTC', title: 'Bitcoin', slug: 'bitcoin', url: 'https://cryptopanic.com/news/bitcoin/' },
                {
                    code: 'BCH',
                    title: 'Bitcoin Cash',
                    slug: 'bitcoin-cash',
                    url: 'https://cryptopanic.com/news/bitcoin-cash/',
                },
            ],
            id: 8953383,
            url:
                'https://cryptopanic.com/news/8953383/Roger-Ver-Claims-Meeting-with-Head-of-State-Regarding-Bitcoin-Cash-National-Adoption',
            created_at: '2020-05-31T06:40:55Z',
            votes: {
                negative: 0,
                positive: 0,
                important: 0,
                liked: 0,
                disliked: 0,
                lol: 0,
                toxic: 0,
                saved: 0,
                comments: 0,
            },
        },
    ],
};

describe('Formatters', () => {
    test('currentDataFormatter formats properly', () => {
        expect(currentDataFormatter(currentData)).toStrictEqual(['2020-05-31T07:37:00+00:00', 8625.8431]);
        expect(currentDataFormatter(null)).toStrictEqual([null, null]);
    });
    test('historicalDataFormatter formats properly', () => {
        expect(historicalDataFormatter(historicalData)).toStrictEqual(chartDataMock);
    });
    test('newsDataFormatter formats properly', () => {
        expect(newsDataFormatter(newsData)).toStrictEqual(newsData);
    });
});
