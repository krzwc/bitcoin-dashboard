/* Use StrictUnion to type annotate discriminated unions:
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 * example:
 * https://stackoverflow.com/questions/52677576/typescript-discriminated-union-allows-invalid-state/52678379#52678379
 * */
export type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends T
    ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>>
    : never;
export type StrictUnion<T> = StrictUnionHelper<T, T>;

enum CURRENCIES {
    USD = 'USD',
    GBP = 'GBP',
    EUR = 'EUR',
}
export interface CurrentData {
    time: {
        update: string;
        updateduk: string;
    };
    disclaimer: string;
    chartName: string;
    bpi: {
        USD: {
            code: CURRENCIES.USD;
            symbol: string;
            rate: string;
            description: string;
            rate_float: number;
        };
        GBP: {
            code: CURRENCIES.GBP;
            symbol: string;
            rate: string;
            description: string;
            rate_float: number;
        };
        EUR: {
            code: CURRENCIES.EUR;
            symbol: string;
            rate: string;
            description: string;
            rate_float: number;
        };
    };
}

export interface HistoricalData {
    bpi: {
        [date: string]: number;
    };
}

export interface NewsData {
    count: number;
    next: string;
    previous: string;
    results: {
        kind: string;
        domain: string;
        source: {
            title: string;
            region: string;
            domain: string;
            path: string;
        };
        created_at: string;
        id: number;
        published_at: string;
        slug: string;
        title: string;
        url: string;
        currencies: {
            code: string;
            slug: string;
            title: string;
            url: string;
        }[];
    }[];
}

export type Response = StrictUnion<CurrentData | HistoricalData | NewsData>
