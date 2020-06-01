import React from 'react';
import generateGrid from '../generateGrid';

const layout = {
    lg: [
        { x: 1, y: 1, w: 1, h: 1 },
        { x: 2, y: 2, w: 2, h: 2 },
        { x: 3, y: 3, w: 3, h: 3 },
    ],
};

const components = [<div key={1} />, <div key={2} />, <div key={3} />];

describe('generateGrid', () => {
    test('generates grid properly', () => {
        expect(generateGrid(components, layout)).toStrictEqual({
            lg: [
                { component: <div key={1} />, x: 1, y: 1, w: 1, h: 1 },
                { component: <div key={2} />, x: 2, y: 2, w: 2, h: 2 },
                { component: <div key={3} />, x: 3, y: 3, w: 3, h: 3 },
            ],
        });
    });
});
