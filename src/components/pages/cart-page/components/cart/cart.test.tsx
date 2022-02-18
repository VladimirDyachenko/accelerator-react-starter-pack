import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';

import Cart from './cart';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { State } from 'types/types';
import { createApi } from 'services/api';
import { NameSpace } from 'store/root-reducer';
import { ApiRoute } from 'const/const';

const history = createMemoryHistory();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const productMock = generateGuitarMock();
const mockAPI = new MockAdapter(api);

describe('Component: Cart', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render Cart correctly', () => {
    const store = mockStore({
      [NameSpace.Product]: { product: productMock },
      [NameSpace.Cart]: {
        itemsInCartList: [{ id: productMock.id, amount: 1 }],
        productsData: { [productMock.id]: productMock },
      },
    });

    render(
      <Router history={history}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('cart-item-total-price')).toBeInTheDocument();
  });

  it('should show spinner', async () => {
    const store = mockStore({
      [NameSpace.Product]: { product: productMock },
      [NameSpace.Cart]: {
        itemsInCartList: [{ id: productMock.id, amount: 1 }],
        productsData: {},
      },
    });

    mockAPI.onGet(`${ApiRoute.Guitars}/${productMock.id}`).reply(200, productMock);

    render(
      <Router history={history}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('hidden-text')).toHaveTextContent(/Загрузка/);

    // Фикс ошибки "An update to Cart inside a test was not wrapped in act(...)"
    // Из-за обновления стэйта после успешной загрузки эта линия нужна
    await waitFor(() => mockAPI.history['get'].length !== 0, { timeout: 150 });
  });

  it('should show error message', async () => {
    const store = mockStore({
      [NameSpace.Product]: { product: productMock },
      [NameSpace.Cart]: {
        itemsInCartList: [{ id: productMock.id, amount: 1 }],
        productsData: {},
      },
    });

    mockAPI.onGet(`${ApiRoute.Guitars}/${productMock.id}`).reply(400);

    render(
      <Router history={history}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </Router>,
    );
    await waitFor(() => mockAPI.history['get'].length !== 0, { timeout: 150 });

    expect(screen.getByText(/Ошибка загрузки/)).toBeInTheDocument();
  });

  it('should show empty cart message', () => {
    const store = mockStore({
      [NameSpace.Product]: { product: productMock },
      [NameSpace.Cart]: {
        itemsInCartList: [],
        productsData: {},
      },
    });

    render(
      <Router history={history}>
        <Provider store={store}>
          <Cart />
        </Provider>
      </Router>,
    );

    expect(screen.getByText(/В корзине еще ничего нет/)).toBeInTheDocument();
  });
});
