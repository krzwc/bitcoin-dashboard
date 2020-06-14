import reducer from 'hooks/useThunkReducer/reducer';
import ACTIONS from 'hooks/actions';
import { mockedInitialState } from 'hooks/useThunkReducer/__tests__/useThunkReducer';

describe('reducer', () => {
    test('should return initial state by default', () => {
        expect(reducer(mockedInitialState, { type: null })).toStrictEqual(mockedInitialState);
    });
    test('dispatched action without payload changes state', () => {
        expect(reducer(mockedInitialState, { type: ACTIONS.FETCHING })).toStrictEqual({
            result: null,
            loading: true,
            error: null,
        });
    });
    test('dispatched action with payload changes state', () => {
        expect(
            reducer(mockedInitialState, { type: ACTIONS.RESPONSE_COMPLETE, payload: { result: 100 } }),
        ).toStrictEqual({
            result: 100,
            loading: false,
            error: null,
        });
    });
    test('dispatched action that resulted in error changes state', () => {
        expect(reducer(mockedInitialState, { type: ACTIONS.ERROR, payload: { error: 'error' } })).toStrictEqual({
            result: null,
            loading: false,
            error: 'error',
        });
    });
});
