import ACTIONS from '../actions';
import { State, Action } from '../interfaces';

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ACTIONS.FETCHING:
            return {
                result: null,
                loading: true,
                error: null,
            };
        case ACTIONS.RESPONSE_COMPLETE:
            return {
                result: action.payload.result,
                loading: false,
                error: null,
            };
        case ACTIONS.ERROR:
            return {
                result: null,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default reducer;
