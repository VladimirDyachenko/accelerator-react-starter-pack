import { datatype } from 'faker';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../services/api';
import { ApiRoute, FallbackMinMaxPrice } from 'const/const';
import { State } from 'types/types';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import {
  setGuitarList,
  setMinMaxPrice,
  setProductsLoadingStatus,
  setTotalItemsCount
} from './catalog-process/actions';
import {
  fetchGuitarList,
  fetchMinMaxPrice
} from './api-actions';

describe('test async actions', () => {
  const api = createApi();
  const middlewareList = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewareList);

  it('fetchGuitarList: should set guitars data and total items count when server respond with 200', async () => {
    const store = mockStore();
    const mockAPI = new MockAdapter(api);

    const guitarListMock = new Array(datatype.number(30))
      .fill(undefined)
      .map(generateGuitarMock);
    const totalItemsCountMock = guitarListMock.length;

    mockAPI
      .onGet(/\/guitars/)
      .reply(
        200,
        guitarListMock,
        {'x-total-count': totalItemsCountMock},
      );

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarList());

    expect(store.getActions()).toEqual([
      setProductsLoadingStatus(true, false),
      setGuitarList(guitarListMock),
      setTotalItemsCount(totalItemsCountMock),
      setProductsLoadingStatus(false, false),
    ]);
  });

  it('fetchGuitarList: should set guitars data to empty array and set loading error when server respond with error', async () => {
    const store = mockStore();
    const mockAPI = new MockAdapter(api);

    mockAPI
      .onGet(/\/guitars/)
      .reply(400);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchGuitarList());

    expect(store.getActions()).toEqual([
      setProductsLoadingStatus(true, false),
      setGuitarList([]),
      setProductsLoadingStatus(false, true),
    ]);
  });

  it('fetchMinMaxPrice: should set min and max price when server respond with 200', async () => {
    const store = mockStore();
    const mockAPI = new MockAdapter(api);

    const minPrice = 100;
    const maxPrice = 1000;

    mockAPI
      .onGet(`${ApiRoute.Guitars}?_sort=price&_order=acs&_limit=1`)
      .reply(200, [{price: minPrice}]);
    mockAPI
      .onGet(`${ApiRoute.Guitars}?_sort=price&_order=desc&_limit=1`)
      .reply(200, [{price: maxPrice}]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchMinMaxPrice());

    expect(store.getActions()).toEqual([
      setMinMaxPrice(minPrice, maxPrice),
    ]);
  });

  it('fetchMinMaxPrice: should set fallback min and max price when server respond with error', async () => {
    const store = mockStore();
    const mockAPI = new MockAdapter(api);

    mockAPI.onAny().reply(400);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchMinMaxPrice());

    expect(store.getActions()).toEqual([
      setMinMaxPrice(FallbackMinMaxPrice.min, FallbackMinMaxPrice.max),
    ]);
  });

});