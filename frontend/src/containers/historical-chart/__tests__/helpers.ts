import { dataBoundries, getRefLines } from 'containers/historical-chart';
import { chartDataMock } from 'components/chart/__tests__/chart';

describe('historical chart helper functions', () => {
    test('dataBoundries', () => {
        expect(dataBoundries(chartDataMock)).toStrictEqual([8000, 9000]);
    });
    test('getRefLines', () => {
        expect(getRefLines(chartDataMock.map((dataItem) => dataItem.USD))).toStrictEqual([
            8740.75,
            8748.32625,
            8755.9025,
            8763.47875,
            8771.055,
            8778.63125,
            8786.2075,
            8793.78375,
            8801.36,
        ]);
    });
});
