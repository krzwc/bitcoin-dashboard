import useInterval from 'hooks/useInterval';
import { renderHook, act } from '@testing-library/react-hooks';

const mockedCallback = jest.fn();

describe('useInterval', () => {
    test('works properly', () => {
        jest.useFakeTimers();
        const { result } = renderHook(() => useInterval(mockedCallback, 1000));
        const start = result.current[0];
        const stop = result.current[1];
        act(start);
        jest.advanceTimersByTime(3000);
        expect(mockedCallback).toHaveBeenCalledTimes(3);
        act(stop);
        jest.clearAllTimers();
    });
});
