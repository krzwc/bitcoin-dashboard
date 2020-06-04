import React from 'react';
import DownArrow from 'components/down-arrow';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('DownArrow', () => {
    test('snapshot test', () => {
        const wrapper = shallow(<DownArrow className="css-class" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
