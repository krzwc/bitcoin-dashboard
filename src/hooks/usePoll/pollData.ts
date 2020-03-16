import ACTIONS from '../actions';
import { EnhancedDispatch } from '../interfaces';
import fetchData from '../useFetch/fetchData';
import useInterval from '../useInterval';

const INTERVAL = 30000;

const pollData = (dispatch: EnhancedDispatch) => {
    const [start, stop] = useInterval(() => {
        dispatch({ type: ACTIONS.POLLING });
        fetchData(dispatch);
    }, INTERVAL);

    return [start, stop];
};

export default pollData;
