import React from 'react';
import Dashboard from 'components/dashboard';
import { mount } from 'enzyme';
import generateGrid from 'utils/generateGrid';
import { layout, components } from 'utils/__tests__/generateGrid';

describe('Dashboard component', () => {
    test('renders correctly', () => {
        const container = mount(<Dashboard gridItems={generateGrid(components, layout)} />);
        expect(container.find('.react-grid-layout').hasClass('dashboard')).toBe(true);
    });
});
