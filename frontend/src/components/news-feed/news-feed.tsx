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
        <ul className="news-feed">
            {!isEmpty(results) &&
                results.map((newsItem) => (
                    <li key={newsItem.id}>
                        <span className="time">{convertTimestamp(newsItem.published_at)}</span>
                        <span className="link">
                            <a href={newsItem.url}>{newsItem.title}</a>
                        </span>
                    </li>
                ))}
        </ul>
    );
};

export default NewsFeed;
