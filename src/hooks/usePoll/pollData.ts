import ACTIONS from '../actions';
import { EnhancedDispatch } from '../interfaces';
import fetchData from '../useFetch/fetchData';
import useInterval from '../useInterval';

import { POLLING_INTERVAL } from '../../utils/consts';

const pollData = (dispatch: EnhancedDispatch) => {
    const [start, stop] = useInterval(() => {
        dispatch({ type: ACTIONS.POLLING });
        fetchData(dispatch);
    }, POLLING_INTERVAL);

    return [start, stop];
};

export default pollData;
