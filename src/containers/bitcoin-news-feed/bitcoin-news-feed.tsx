import React, { useEffect, useState, SyntheticEvent } from 'react';
import NewsFeed from '../../components/news-feed';
import Container from '../../components/container';
import { withResizeDetector } from 'react-resize-detector';
import { ENDPOINTS } from '../../utils/endpoint';
import { ResizeDetectorChartProps } from '../interfaces';
import { useFetch, usePoll } from '../../hooks';
import { POLLING_INTERVALS } from '../../utils/consts';
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

    const [pollingResult, , pollingError, pollingStart] = usePoll(
        (state.toJS() as State).current,
        POLLING_INTERVALS.NEWS,
        newsDataFormatter,
    );

    const [fetchingResult, fetchingError] = useFetch((state.toJS() as State).current, newsDataFormatter);

    useEffect(() => {
        if (!isNull(pollingResult)) {
            setState(Map({ ...((pollingResult as unknown) as State), current: (state.toJS() as State).current }));
        }
        if (!isNull(fetchingResult)) {
            setState(Map({ ...((fetchingResult as unknown) as State), current: (state.toJS() as State).current }));
        }
    }, [pollingResult, fetchingResult]);

    useEffect(() => {
        (pollingStart as () => void)();
        if ((state.toJS() as State).current !== ENDPOINTS.NEWS) {
            stop();
        }
    }, []);

    const previousHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        // TODO: setState() => current = previous
        console.log('hi');
    };

    const nextHandler = (e: SyntheticEvent) => {
        e.stopPropagation();
        // TODO: setState() => current = next
        console.log('hi');
    };

    return (
        <Container>
            <h1>News</h1>
            {console.log(state.toJS())}
            {pollingError && <p className="error">{pollingError}</p>}
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
