import usePoll from 'hooks/usePoll';
import { chartDataMock } from 'components/chart/__tests__/chart';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import { renderHook, act } from '@testing-library/react-hooks';
import { ENDPOINTS } from 'utils/endpoint';

const mockFormatter = (response: any) => response;

describe('useFetch', () => {
    test('should work properly', async () => {
        fetchMock.mock(ENDPOINTS.CURRENT, chartDataMock);
        const { result, waitForNextUpdate } = renderHook(() => usePoll(ENDPOINTS.CURRENT, 1000, mockFormatter));
        const start = result.current[3];
        const stop = result.current[4];
        act(start);
        await waitForNextUpdate();
        expect(JSON.stringify(result.current[0])).toStrictEqual(JSON.stringify(chartDataMock));
        act(stop);
    });
});
