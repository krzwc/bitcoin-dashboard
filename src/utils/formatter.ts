import { get } from 'lodash-es';

const formatter = (response: any): [string, number] => [
    get(response, ['time', 'updatedISO'], null),
    get(response, ['bpi', 'EUR', 'rate_float'], null),
];

export default formatter;
