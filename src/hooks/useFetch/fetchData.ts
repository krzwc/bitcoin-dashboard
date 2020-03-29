import ACTIONS from '../actions';
import { EnhancedDispatch } from '../interfaces';

interface Fetch {
    dispatch: EnhancedDispatch;
    endpoint: string;
    formatter(response: any): {};
}

const fetchData = ({ dispatch, endpoint, formatter }: Fetch): void => {
    dispatch({ type: ACTIONS.FETCHING });
    fetch(endpoint)
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
