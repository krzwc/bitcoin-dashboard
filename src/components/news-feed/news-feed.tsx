import React from 'react';
import { isEmpty } from 'lodash-es';
import { convertTimestamp } from '../../utils/timeservice';

export interface NewsItem {
    published_at: string;
    title: string;
    url: string;
    id: number;
}

export interface NewsFeedProps {
    results: NewsItem[];
}

const NewsFeed = ({ results }: NewsFeedProps) => {
    return (
        <ul>
            {!isEmpty(results) &&
                results.map((newsItem) => (
                    <li key={newsItem.id}>
                        {convertTimestamp(newsItem.published_at)} - <a href={newsItem.url}>{newsItem.title}</a>
                    </li>
                ))}
        </ul>
    );
};

export default NewsFeed;
