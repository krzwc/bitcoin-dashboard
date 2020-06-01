import { convertTimestamp, TIMEFORMATS } from '../timeservice';

describe('convertTimestamp', () => {
    test('converts properly', () => {
        expect(convertTimestamp(new Date('December 17, 1995 03:24:00').getTime())).toStrictEqual('03:24');
        expect(
            convertTimestamp(new Date('December 17, 1995 03:24:00').getTime(), TIMEFORMATS.NATURAL_DATE_FORMAT),
        ).toStrictEqual('17.12.1995, 03:24:00');
        expect(convertTimestamp(new Date('December 17, 1995 03:24:00').getTime(), TIMEFORMATS.DAYS_ONLY)).toStrictEqual(
            '17.12',
        );
    });
});
