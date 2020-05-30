import reducer from 'hooks/useThunkReducer/reducer';
import useThunkReducer from 'hooks/useThunkReducer';
import { Response } from 'types/interfaces';

import pollData from './pollData';
import initialState from '../initialState';

const usePoll = (endpoint: string, interval: number, formatter: (response: Response) => {}) => {
    const [state, enhancedDispatch] = useThunkReducer(reducer, initialState);

    const [start, stop] = pollData({ dispatch: enhancedDispatch, endpoint, interval, formatter });

    const { result, loading, error } = state;

    return [result, loading, error, start, stop];
};

export default usePoll;
