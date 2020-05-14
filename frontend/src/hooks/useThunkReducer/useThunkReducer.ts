import { useReducer, useCallback, Reducer } from 'react';
import { State, Action, EnhancedDispatch } from '../interfaces';
import { isFunction } from 'lodash-es';

const useThunkReducer = (reducer: Reducer<State, Action>, initialState: State): [State, EnhancedDispatch] => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const enhancedDispatch = useCallback(
        (action) => {
            if (isFunction(action)) {
                // In case it's a thunk
                action(dispatch);
            } else {
                // Regular action obj
                dispatch(action);
            }
        },
        [dispatch],
    );

    return [state, enhancedDispatch];
};

export default useThunkReducer;
