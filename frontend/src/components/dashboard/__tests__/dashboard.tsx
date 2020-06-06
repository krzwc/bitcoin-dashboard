import React from 'react';
import Dashboard, { addI, generateLayout, generateDOM, getLayoutsAndDomLayouts } from 'components/dashboard';
import { mount } from 'enzyme';
import generateGrid from 'utils/generateGrid';
import { layout as layoutDef, components, generateGridResult, gridItemsArr } from 'utils/__tests__/generateGrid';

const gridItemsArrWithI = [
    { component: <div key={1} />, x: 1, y: 1, w: 1, h: 1, i: '0' },
    { component: <div key={2} />, x: 2, y: 2, w: 2, h: 2, i: '1' },
    { component: <div key={3} />, x: 3, y: 3, w: 3, h: 3, i: '2' },
];
const layout = {
    lg: gridItemsArrWithI,
};
const DOM = [
    <div key={0}>
        <div key={1} />
    </div>,
    <div key={1}>
        <div key={2} />
    </div>,
    <div key={2}>
        <div key={3} />
    </div>,
];

describe('Dashboard', () => {
    test('component renders correctly', () => {
        const container = mount(<Dashboard gridItems={generateGrid(components, layoutDef)} />);
        expect(container.find('.react-grid-layout').hasClass('dashboard')).toBe(true);
    });
    describe('helper function', () => {
        test('addI works correctly', () => {
            expect(JSON.stringify(addI(gridItemsArr))).toStrictEqual(JSON.stringify(gridItemsArrWithI));
        });
        test('generateLayout works correctly', () => {
            expect(JSON.stringify(generateLayout(generateGridResult))).toStrictEqual(JSON.stringify(layout));
        });
        test('generateDOM works correctly', () => {
            expect(JSON.stringify(generateDOM(layout))).toStrictEqual(JSON.stringify(DOM));
        });
        test('getLayoutsAndDomLayouts works correctly', () => {
            expect(JSON.stringify(getLayoutsAndDomLayouts(generateGridResult))).toStrictEqual(
                JSON.stringify({ layouts: layout, domLayout: DOM }),
            );
        });
    });
});
