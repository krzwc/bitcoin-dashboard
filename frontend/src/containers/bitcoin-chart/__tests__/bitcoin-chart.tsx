/*import React from 'react';
import { mount } from 'enzyme';*/
import {
    /*BitcoinChart,*/ yDomainMinGenerator,
    yDomainMaxGenerator,
    chartStrokeColor,
} from 'containers/bitcoin-chart';
// @ts-ignore
import theme from 'style/_theme.scss';

/*import Chart from 'components/chart';
import { chartDataMock } from 'components/chart/__tests__/chart';*/

describe('BitcoinChart', () => {
    /*test('component renders correctly', () => {
        window.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    ok: true,
                    json: () =>
                        new Promise((res, rej) => {
                            res(chartDataMock);
                        }),
                });
            });
        });
        const container = mount(<BitcoinChart />);
        expect(container.find(Chart).exists()).toBe(true);
    });*/
    describe('helper functions', () => {
        test('yDomainMinGenerator works as expected', () => {
            expect(yDomainMinGenerator([1, 2, 3])).toStrictEqual(0.9995);
        });
        test('yDomainMinGenerator works as expected', () => {
            expect(yDomainMaxGenerator([1, 2, 3])).toStrictEqual(3.0015);
        });
        test('chartStrokeColor works as expected', () => {
            expect(chartStrokeColor(1, 2)).toStrictEqual(theme.GREEN);
        });
    });
});
