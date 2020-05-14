import ACTIONS from '../actions';
import { EnhancedDispatch } from '../interfaces';
import fetchData from '../useFetch/fetchData';
import useInterval from '../useInterval';
import { Response } from '../../types/interfaces';

interface Poll {
    dispatch: EnhancedDispatch;
    endpoint: string;
    interval: number;
    formatter(response: Response): {};
}

const pollData = ({ dispatch, endpoint, formatter, interval }: Poll) => {
    const [start, stop] = useInterval(() => {
        dispatch({ type: ACTIONS.POLLING });
        fetchData({ dispatch, endpoint, formatter });
    }, interval);

    return [start, stop];
};

export default pollData;
