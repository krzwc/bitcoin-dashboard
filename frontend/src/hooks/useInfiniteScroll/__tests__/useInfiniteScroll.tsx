import React, { createRef } from 'react';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { renderHook /*, act*/ } from '@testing-library/react-hooks';
import { mount } from 'enzyme';

describe('useInfiniteScroll', () => {
    test('should call IntersectionObserver', async () => {
        const observe = jest.fn();
        const unobserve = jest.fn();
        const mockDispatch = jest.fn();
        const mockState = 'new state';

        // @ts-ignore
        window.IntersectionObserver = jest.fn(() => ({
            observe,
            unobserve,
        }));

        const testRef = createRef<HTMLDivElement>();

        const divComponent = mount(
            <div>
                <div style={{ height: '100px' }} />
                <div style={{ height: '1px' }} ref={testRef} />
            </div>,
        );

        divComponent.simulate('scroll');

        renderHook(() => useInfiniteScroll(testRef, mockDispatch, mockState));

        expect(observe).toHaveBeenCalled();
    });
});
