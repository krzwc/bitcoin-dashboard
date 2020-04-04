import React from 'react';

interface NewsItem {
    published_at: string;
    title: string;
    url: string;
    id: number;
}

interface NewsFeedProps {
    results: NewsItem[];
}

const NewsFeed = ({ results }: NewsFeedProps) => {
    return (
        <ul>
            {results &&
                results.map((newsItem) => (
                    <li key={newsItem.id}>
                        {newsItem.published_at} - <a href={newsItem.url}>{newsItem.title}</a>
                    </li>
                ))}
        </ul>
    );
};

export default NewsFeed;
