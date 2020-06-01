import { rangeWithStep, calculateDiff, presentDiff, calculatePercentage, presentPercentage } from '../helpers';

describe('Helper functions', () => {
    test('rangeWithStep', () => {
        expect(rangeWithStep(10, 2, 4)).toStrictEqual([10, 12, 14, 16]);
    });
    test('calculateDiff', () => {
        expect(calculateDiff(10, 2)).toStrictEqual(-8);
    });
    test('presentDiff', () => {
        expect(presentDiff(10.5, 2.5)).toStrictEqual(-8);
        expect(presentDiff(2.5, 10.5)).toStrictEqual(`+${8}`);
    });
    test('calculatePercentage', () => {
        expect(calculatePercentage(10, 2)).toStrictEqual(-80);
    });
    test('presentPercentage', () => {
        expect(presentPercentage(10, 2)).toStrictEqual(`${-80}%`);
        expect(presentPercentage(2, 10)).toStrictEqual(`+${400}%`);
    });
});
