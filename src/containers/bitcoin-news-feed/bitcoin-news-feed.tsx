import React, { useEffect, useState } from 'react';
import NewsFeed from '../../components/news-feed';
import Container from '../../components/container';
import { withResizeDetector } from 'react-resize-detector';
import { ENDPOINTS } from '../../utils/endpoint';
import { ResizeDetectorChartProps } from '../interfaces';
import { useFetch, usePoll } from '../../hooks';
import { POLLING_INTERVALS } from '../../utils/consts';
import { isNull, isEmpty } from 'lodash-es';
import { newsDataFormatter } from '../../utils/formatter';
import { NewsItem } from '../../components/news-feed/news-feed';
import { List } from 'immutable';

const initialState: List<NewsItem> = List([]);

const BitcoinNewsFeed = ({ width, height }: ResizeDetectorChartProps) => {
    const [news, setNews] = useState(initialState);
    const [pollingResult, , pollingError, pollingStart] = usePoll(
        ENDPOINTS.NEWS,
        POLLING_INTERVALS.NEWS,
        newsDataFormatter,
    );
    const [fetchingResult, fetchingError] = useFetch(ENDPOINTS.NEWS, newsDataFormatter);

    useEffect(() => {
        if (!isNull(pollingResult)) {
            setNews(List((pollingResult as unknown) as NewsItem[]));
        }
    }, [pollingResult]);

    useEffect(() => {
        if (!isNull(fetchingResult)) {
            setNews(List((fetchingResult as unknown) as NewsItem[]));
        }
    }, [fetchingResult]);


    useEffect(() => {
        (pollingStart as () => void)();
    }, []);

    return (
        <Container>
            <h1>News</h1>
            {pollingError && <p className="error">{pollingError}</p>}
            {fetchingError && <p className="error">{fetchingError}</p>}
            {!isEmpty(news.toJS()) && <NewsFeed results={(news.toJS() as unknown) as NewsItem[]} />}
        </Container>
    );
};

export default withResizeDetector(BitcoinNewsFeed);
