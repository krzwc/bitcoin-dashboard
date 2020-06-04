import React from 'react';
import Loader from 'components/loader';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Loader', () => {
    test('snapshot test', () => {
        const wrapper = shallow(<Loader />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
