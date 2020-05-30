import { useEffect } from 'react';

import reducer from 'hooks/useThunkReducer/reducer';
import useThunkReducer from 'hooks/useThunkReducer';
import { Response } from 'types/interfaces';

import initialState from '../initialState';
import fetchData from './fetchData';

const useFetch = (endpoint: string, formatter: (response: Response) => {}) => {
    const [state, enhancedDispatch] = useThunkReducer(reducer, initialState);

    useEffect(() => {
        fetchData({ dispatch: enhancedDispatch, endpoint, formatter });
    }, [fetchData, enhancedDispatch, endpoint]);

    const { result, loading, error } = state;

    return [result, loading, error];
};

export default useFetch;
