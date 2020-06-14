import useThunkReducer from 'hooks/useThunkReducer';
import { Action, State } from '../../interfaces';
import ACTIONS from 'hooks/actions';
import { renderHook, act } from '@testing-library/react-hooks';

const mockedReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ACTIONS.FETCHING:
            return mockedChangedState;
        default:
            return state;
    }
};

export const mockedInitialState: State = {
    result: '',
    loading: false,
    error: '',
};

export const mockedChangedState = {
    result: 'test',
    loading: false,
    error: '',
};

describe('useThunkReducer', () => {
    test('should return initial state as default', () => {
        const { result } = renderHook(() => useThunkReducer(mockedReducer, mockedInitialState));
        expect(result.current[0]).toStrictEqual(mockedInitialState);
    });
    test('dispatched action changes state', () => {
        const { result } = renderHook(() => useThunkReducer(mockedReducer, mockedInitialState));
        const dispatch = result.current[1];
        act(() => {
            dispatch({ type: ACTIONS.FETCHING });
        });
        expect(result.current[0]).toStrictEqual(mockedChangedState);
    });
});
