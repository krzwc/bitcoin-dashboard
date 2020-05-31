import React, { useEffect, useState, useRef } from 'react';
import { withResizeDetector } from 'react-resize-detector';
import { get, isNull, isEmpty } from 'lodash-es';
import { Map } from 'immutable';

import NewsFeed from 'components/news-feed';
import Container from 'components/container';
import { ENDPOINTS, convertURL } from 'utils/endpoint';
import { useFetch } from 'hooks/index';
import { newsDataFormatter } from 'utils/formatter';
import { NewsItem } from 'components/news-feed/news-feed';
import Loader from 'components/loader';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import DownArrow from 'components/down-arrow';
// @ts-ignore
import variables from 'style/_variables.scss';

import { ResizeDetectorChartProps } from '../interfaces';

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

    // tslint:disable-next-line:binary-expression-operand-order
    const getStyle = width ? { width: width - 2 * variables.CHART_LEFT_RIGHT_PADDING } : {};

    return (
        <Container ref={bottomBoundaryRef} width={width} height={height}>
            <DownArrow className={get(state.toJS(), ['next']) ? 'bounce' : 'hide'} />
            <div className="header" style={getStyle}>
                <h1>News</h1>
                <h3>Get the latest bitcoin world news</h3>
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
