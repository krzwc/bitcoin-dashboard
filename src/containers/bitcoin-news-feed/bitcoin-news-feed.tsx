import React, { useEffect, useState } from 'react';
import NewsFeed from '../../components/news-feed';
import Container from '../../components/container';
import { withResizeDetector } from 'react-resize-detector';
import { ENDPOINTS } from '../../utils/endpoint';
import { ResizeDetectorChartProps } from '../interfaces';
import { usePoll } from '../../hooks';
import { POLLING_INTERVALS } from '../../utils/consts';
import { isNull } from 'lodash-es';
import { newsDataFormatter } from '../../utils/formatter';
import { NewsItem } from '../../components/news-feed/news-feed';
import { List } from 'immutable';

const initialState: List<NewsItem> = List([]);

const BitcoinNewsFeed = ({ width, height }: ResizeDetectorChartProps) => {
    const [news, setNews] = useState(initialState);
    const [result, , error, start] = usePoll(ENDPOINTS.NEWS, POLLING_INTERVALS.NEWS, newsDataFormatter);

    useEffect(() => {
        if (!isNull(result)) {
            setNews(List((result as unknown) as NewsItem[]));
        }
    }, [result]);

    useEffect(() => {
        (start as () => void)();
    }, []);

    return (
        <Container>
            <h1>News</h1>
            {error && <p className="error">{error}</p>}
            <NewsFeed results={(news as unknown) as NewsItem[]} />
        </Container>
    );
};

export default withResizeDetector(BitcoinNewsFeed);
