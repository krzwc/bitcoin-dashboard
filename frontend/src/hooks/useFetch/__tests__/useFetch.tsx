import useFetch from 'hooks/useFetch';
/*import { act } from 'react-dom/test-utils';*/
import { chartDataMock } from 'components/chart/__tests__/chart';
import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import { renderHook } from '@testing-library/react-hooks';
import { ENDPOINTS } from 'utils/endpoint';

/*const HookWrapper = (props: any) => {
    const hook = props.hook ? props.hook() : undefined;

    // @ts-ignore
    return <div hook={hook} />;
};*/

const mockFormatter = (response: any) => response;

describe('useFetch', () => {
    beforeAll(() => {
        window.fetch = fetch;
    });
    afterAll(() => {
        fetchMock.restore();
    });

    test('should work properly', async () => {
        fetchMock.mock(ENDPOINTS.CURRENT, chartDataMock);
        const { result, waitForNextUpdate } = renderHook(() => useFetch(ENDPOINTS.CURRENT, mockFormatter));
        await waitForNextUpdate();
        expect(JSON.stringify(result.current[0])).toStrictEqual(JSON.stringify(chartDataMock));
    });
});
