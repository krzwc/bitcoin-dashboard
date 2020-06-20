import React from 'react';
import NewsFeed from 'components/news-feed';
import { mount } from 'enzyme';
import { newsData } from 'utils/__tests__/formatter';

describe('NewsFeed component', () => {
    test('renders correctly', () => {
        const container = mount(<NewsFeed results={newsData.results} />);
        expect(container.find('ul').exists()).toBe(true);
        expect(
            container
                .find('li')
                .first()
                .find('span')
                .first()
                .text()
                .split(':')[1],
        ).toContain('15');
    });
});
