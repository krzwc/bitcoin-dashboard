import reducer from '../useThunkReducer/reducer';
import useThunkReducer from '../useThunkReducer';
import pollData from './pollData';
import initialState from '../initialState';

const usePoll = () => {
    const [state, enhancedDispatch] = useThunkReducer(reducer, initialState);

    const [start, stop] = pollData(enhancedDispatch);

    const { result, loading, error } = state;

    return [result, loading, error, start, stop];
};

export default usePoll;
