import React, { useEffect, useState, useRef /*, SyntheticEvent*/ } from 'react';
import NewsFeed from '../../components/news-feed';
import Container from '../../components/container';
import { withResizeDetector } from 'react-resize-detector';
import { ENDPOINTS, convertURL } from '../../utils/endpoint';
import { ResizeDetectorChartProps } from '../interfaces';
import { useFetch } from '../../hooks';
import { get, isNull, isEmpty } from 'lodash-es';
import { newsDataFormatter } from '../../utils/formatter';
import { NewsItem } from '../../components/news-feed/news-feed';
import { Map } from 'immutable';
import Loader from '../../components/loader';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import DownArrow from '../../components/down-arrow';

export interface State {
    count: number;
    next: string;
    previous: string;
    results: NewsItem[];
}

const initialState: Map<string, State[keyof State]> = Map({
    count: null,
    next: null,
    previous: null,
    results: [],
});

const BitcoinNewsFeed = ({ width, height }: ResizeDetectorChartProps) => {
    const [state, setState] = useState(initialState);
    const [url, setUrl] = useState(ENDPOINTS.NEWS);

    const [fetchingResult, fetchingError] = useFetch(url, newsDataFormatter);

    useEffect(() => {
        if (!isNull(fetchingResult)) {
            setState((currentState) =>
                currentState.merge({
                    count: fetchingResult.count,
                    results: [...get(currentState.toJS(), ['results']), ...fetchingResult.results],
                    next: fetchingResult.next && convertURL(fetchingResult.next),
                    previous: fetchingResult.previous && convertURL(fetchingResult.previous),
                }),
            );
        }
    }, [fetchingResult]);

    const bottomBoundaryRef = useRef<HTMLDivElement>(null);

    useInfiniteScroll(bottomBoundaryRef, setUrl, get(state.toJS(), ['next']));

    return (
        <Container ref={bottomBoundaryRef} width={width} height={height}>
            <DownArrow className={get(state.toJS(), ['next']) ? 'bounce' : 'hide'} />
            <div className="header">
                <h1>News</h1>
                <h3>placeholder</h3>
            </div>
            {fetchingError && <p className="error">{fetchingError}</p>}
            {!isEmpty(get(state.toJS(), ['results'])) ? (
                <NewsFeed results={get(state.toJS(), ['results'])} />
            ) : (
                <Loader />
            )}
        </Container>
    );
};

export default withResizeDetector(BitcoinNewsFeed);
