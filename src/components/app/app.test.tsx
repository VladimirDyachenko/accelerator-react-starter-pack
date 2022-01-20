import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { createApi } from 'services/api';
import { State } from 'types/types';
import { NameSpace } from 'store/root-reducer';
import App from './app';
import { AppRoute } from 'const/const';

const api = createApi();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.Catalog]: {
    guitars: [],
    minMaxPrice: {
      min: 100,
      max: 1000,
    },
    totalProductsCount: undefined,
    loadingStatus: {
      isLoading: false,
      isError: false,
    },
  },
});

describe('App routing', () => {
  beforeEach(() => {
    mockAPI.reset();
    history.push(AppRoute.Home);
  });

  it('should render 404 page', () => {
    history.push('/there-is-definitely-no-such-route');

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });


  it(`should render "CatalogPage" when user navigate "${AppRoute.Catalog}/1"`, () => {
    history.push(`${AppRoute.Catalog}/1`);

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });

  it(`should render "CartPage" when user navigate "${AppRoute.Cart}"`, () => {
    history.push(AppRoute.Cart);

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.queryAllByRole('heading')[0]).toHaveTextContent('Корзина');
  });

  it(`should render "ProductPage" when user navigate "${AppRoute.Product}"`, () => {
    history.push(`${AppRoute.Product}/1`);

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.queryAllByRole('heading')[0]).toHaveTextContent('Товар');
  });

  it(`should redirect to "${AppRoute.Catalog}/1" when user navigate "${AppRoute.Home}"`, () => {
    history.push(AppRoute.Home);

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(history.location.pathname).toBe(`${AppRoute.Catalog}/1`);
  });

});
