import React from 'react';
import Container from 'components/container';
import { mount } from 'enzyme';

describe('Container component', () => {
    test('renders correctly', () => {
        const container = mount(
            <Container width={100} height={100}>
                <div>test</div>
            </Container>,
        );
        expect(container.find('div').exists()).toBe(true);
        expect(
            container
                .find('div')
                .first()
                .text(),
        ).toContain('test');
    });
});
