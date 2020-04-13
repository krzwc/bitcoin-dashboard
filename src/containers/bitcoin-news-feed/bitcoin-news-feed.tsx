import React, { useEffect, useState, SyntheticEvent } from 'react';
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

interface State {
    current: string;
    count: number;
    next: string;
    previous: string;
    results: NewsItem[];
}

const initialState: Map<string, State[keyof State]> = Map({
    current: ENDPOINTS.NEWS,
    count: null,
    next: null,
    previous: null,
    results: [],
});

const BitcoinNewsFeed = ({ width, height }: ResizeDetectorChartProps) => {
    const [state, setState] = useState(initialState);

    const [fetchingResult, fetchingError] = useFetch((state.toJS() as State).current, newsDataFormatter);

    useEffect(() => {
        if (!isNull(fetchingResult)) {
            const convertedFetchingResult = {
                ...((fetchingResult as unknown) as State),
                next: ((fetchingResult as unknown) as State).next
                    ? convertURL(((fetchingResult as unknown) as State).next)
                    : null,
                previous: ((fetchingResult as unknown) as State).previous
                    ? convertURL(((fetchingResult as unknown) as State).previous)
                    : null,
            };

            setState(state.merge(convertedFetchingResult));
        }
    }, [fetchingResult]);

    const previousHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        setState(state.set('current', state.get('previous')));
    };

    const nextHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        setState(state.set('current', state.get('next')));
    };

    return (
        <Container>
            <h1>News</h1>
            {fetchingError && <p className="error">{fetchingError}</p>}
            {!isEmpty(get(state.toJS(), ['results'])) && (
                <NewsFeed results={(get(state.toJS(), ['results']) as unknown) as NewsItem[]} />
            )}
            <button onClick={previousHandler}>Previous</button>
            <button onClick={nextHandler}>Next</button>
        </Container>
    );
};

export default withResizeDetector(BitcoinNewsFeed);
