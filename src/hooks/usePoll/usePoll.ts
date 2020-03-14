import { useEffect } from 'react';
import reducer from '../useThunkReducer/reducer';
import initialState from '../initialState';

import useThunkReducer from '../useThunkReducer';
import pollData from './pollData';
import Timeout = NodeJS.Timeout;

const usePoll = () => {
    const [state, enhancedDispatch] = useThunkReducer(reducer, initialState);

    let timer: Timeout = null;

    useEffect(() => {
        timer = pollData(enhancedDispatch);
    }, [pollData, enhancedDispatch]);

    const { result, loading, error } = state;

    return [result, loading, error, timer];
};

export default usePoll;
