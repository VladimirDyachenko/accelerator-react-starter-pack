import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Api, ApiRoute } from 'const/const';
import useGuitarSearch from './use-guitar-search';

describe('Hook: useGuitarSearch', () => {
  it('should call api and return array with a response', async () => {

    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`${Api.Url}${ApiRoute.Guitars}?name_like=test`).reply(200, ['response from api']);

    const { result, waitForNextUpdate } = renderHook(
      useGuitarSearch, { initialProps: 'test' },
    );

    await waitForNextUpdate();

    expect(result.current).toEqual([['response from api']]);
    expect(mockAxios.history['get'].length).toBe(1);
  });

  it('should not call api and return an empty array when input empty', async () => {

    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`${Api.Url}${ApiRoute.Guitars}?name_like=test`).reply(200, ['response from api']);

    const { result, rerender, waitForNextUpdate } = renderHook(
      useGuitarSearch, { initialProps: 'test' },
    );

    await waitForNextUpdate();
    mockAxios.resetHistory();
    rerender('');

    expect(mockAxios.history['get'].length).toBe(0);
    expect(result.current).toEqual([[]]);
  });

});
