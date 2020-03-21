import ACTIONS from '../actions';
import { EnhancedDispatch } from '../interfaces';
import { ENDPOINT } from '../../utils/endpoint';
import formatter from '../../utils/formatter';

const fetchData = (dispatch: EnhancedDispatch): void => {
    dispatch({ type: ACTIONS.FETCHING });
    fetch(ENDPOINT)
        .then((response) => response.json())
        .then((response) => {
            dispatch({
                type: ACTIONS.RESPONSE_COMPLETE,
                payload: {
                    result: formatter(response),
                },
            });
        })
        .catch((error) => dispatch({ type: ACTIONS.ERROR, payload: { error } }));
};

export default fetchData;
