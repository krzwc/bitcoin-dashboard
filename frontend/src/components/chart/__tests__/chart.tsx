import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash-es';
import Chart, { yAxisFormatter } from 'components/chart';
import { LineChart } from 'recharts';

export const chartDataMock = [
    { time: '2020-04-30', USD: 8740.75 },
    { time: '2020-05-01', USD: 8771.5725 },
    { time: '2020-05-02', USD: 8891.445 },
    { time: '2020-05-03', USD: 8819.01 },
    { time: '2020-05-04', USD: 8801.36 },
];

beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => noop);
});

describe('Chart', () => {
    test('component renders correctly', () => {
        const container = mount(<Chart data={chartDataMock} />);
        expect(container.find(LineChart).exists()).toBe(true);
        expect(container.find(LineChart).prop('data')).toBe(chartDataMock);
    });
    describe('helper function', () => {
        test('yAxisFormatter works correctly', () => {
            expect(yAxisFormatter(10.01)).toStrictEqual('10');
        });
    });
});
