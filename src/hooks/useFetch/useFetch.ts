import { useEffect } from 'react';
import reducer from '../useThunkReducer/reducer';
import initialState from '../initialState';

import useThunkReducer from '../useThunkReducer';
import fetchData from './fetchData';
import { Response } from '../../types/interfaces';

const useFetch = (endpoint: string, formatter: (response: Response) => {}) => {
    const [state, enhancedDispatch] = useThunkReducer(reducer, initialState);

    useEffect(() => {
        fetchData({ dispatch: enhancedDispatch, endpoint, formatter });
    }, [fetchData, enhancedDispatch, endpoint]);

    const { result, loading, error } = state;

    return [result, loading, error];
};

export default useFetch;
