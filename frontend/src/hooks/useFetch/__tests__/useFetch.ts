import useFetch from 'hooks/useFetch';
import { chartDataMock } from 'components/chart/__tests__/chart';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import { renderHook } from '@testing-library/react-hooks';
import { ENDPOINTS } from 'utils/endpoint';

const mockFormatter = (response: any) => response;

describe('useFetch', () => {
    test('should work properly', async () => {
        fetchMock.mock(ENDPOINTS.CURRENT, chartDataMock);
        const { result, waitForNextUpdate } = renderHook(() => useFetch(ENDPOINTS.CURRENT, mockFormatter));
        await waitForNextUpdate();
        expect(JSON.stringify(result.current[0])).toStrictEqual(JSON.stringify(chartDataMock));
    });
});
