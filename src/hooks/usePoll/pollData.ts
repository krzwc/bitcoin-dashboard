import ACTIONS from '../actions';
import { EnhancedDispatch } from '../interfaces';
import fetchData from '../useFetch/fetchData';
import Timeout = NodeJS.Timeout;

const INTERVAL = 5000;

const pollData = (dispatch: EnhancedDispatch): Timeout => {
    dispatch({ type: ACTIONS.POLLING });

    const timer = setInterval(() => fetchData(dispatch), INTERVAL);

    return timer;
};

export default pollData;
