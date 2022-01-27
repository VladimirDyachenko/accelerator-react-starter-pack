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
  addComment,
  fetchGuitarList,
  fetchMinMaxPrice,
  fetchProductData
} from './api-actions';
import { generateCommentMock } from 'mock/generate-comment-mock';
import { addProductComment, setProductData } from './product-process/actions';

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

  it('fetchProductData: should set product data when server respond with 200', async () => {
    const store = mockStore();
    const mockAPI = new MockAdapter(api);
    const onError = jest.fn();
    const product = generateGuitarMock();
    product.comments = [generateCommentMock()];

    mockAPI.onGet(`${ApiRoute.Guitars}/1?_embed=comments`).reply(200, product);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchProductData(1, onError));

    expect(store.getActions()).toEqual([
      setProductData(product),
    ]);
    expect(onError).not.toBeCalled();
  });

  it('fetchProductData: call onError when server respond with error', async () => {
    const store = mockStore();
    const mockAPI = new MockAdapter(api);
    const onError = jest.fn();

    mockAPI.onGet(`${ApiRoute.Guitars}/1?_embed=comments`).reply(404);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchProductData(1, onError));

    expect(store.getActions()).toEqual([]);
    expect(onError).toBeCalledWith(404);
  });

  it('addComment: should dispatch `addProductComment` when server respond with 200', async () => {
    const store = mockStore();
    const mockAPI = new MockAdapter(api);
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const comment = generateCommentMock();

    const commentPost = {
      guitarId: 1,
      userName: 'string',
      advantage: 'string',
      disadvantage: 'string',
      comment: 'string',
      rating: 1,
    };

    mockAPI.onPost(ApiRoute.Comments).reply(200, comment);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(addComment(commentPost, onSuccess, onError));

    expect(store.getActions()).toEqual([
      addProductComment(comment),
    ]);
    expect(onSuccess).toBeCalled();
    expect(onError).not.toBeCalled();
  });

  it('addComment: should call onError when server respond with 4xx', async () => {
    const store = mockStore();
    const mockAPI = new MockAdapter(api);
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const commentPost = {
      guitarId: 1,
      userName: 'string',
      advantage: 'string',
      disadvantage: 'string',
      comment: 'string',
      rating: 1,
    };

    mockAPI.onPost(ApiRoute.Comments).reply(400);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(addComment(commentPost, onSuccess, onError));

    expect(store.getActions()).toEqual([]);
    expect(onSuccess).not.toBeCalled();
    expect(onError).toBeCalledWith(['Произошла ошибка']);
  });

});
