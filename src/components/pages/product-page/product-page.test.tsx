import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { ApiRoute, AppRoute } from 'const/const';
import { createApi } from 'services/api';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { NameSpace } from 'store/root-reducer';
import { State } from 'types/types';
import ProductPage from './product-page';


const history = createMemoryHistory();
const api = createApi();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const productMock = generateGuitarMock();

const store = mockStore({
  [NameSpace.Product]: {product: productMock},
  [NameSpace.Cart]: {itemsInCartList: []},
});

describe('Component: ProductPage', () => {
  beforeAll(() => {
    // Mock IntersectionObserver
    class IntersectionObserver {
      observe = jest.fn();

      disconnect = jest.fn();

      unobserve = jest.fn();
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: IntersectionObserver,
    });

    Object.defineProperty(global, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: IntersectionObserver,
    });
  });

  beforeEach(() => {
    history.push(`${AppRoute.Product}/${productMock.id}`);
    mockAPI.reset();
  });

  it('should render ProductPage correctly', () => {
    mockAPI
      .onGet(`${ApiRoute.Guitars}/${productMock.id}?_embed=comments`)
      .reply(200, productMock);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`${AppRoute.Product}/:id`}>
              <ProductPage />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('product-page-title')).toHaveTextContent(productMock.name);
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });

  it('should redirect to 404 page because of bad product id', () => {
    history.push(`${AppRoute.Product}/not-a-valid-id`);

    mockAPI
      .onGet(`${ApiRoute.Guitars}/${productMock.id}?_embed=comments`)
      .reply(200, productMock);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`${AppRoute.Product}/:id`}>
              <ProductPage />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(history.location.pathname).toBe('/page-404');
    expect(mockAPI.history['get']).toStrictEqual([]);
  });

  it('should fetch product data with id from URL', async () => {

    mockAPI
      .onGet(`${ApiRoute.Guitars}/${productMock.id} ?_embed=comments`)
      .reply(200, productMock);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`${AppRoute.Product}/:id`}>
              <ProductPage />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    await waitFor(() => new Promise<void>((resolve) => setTimeout(() => resolve(), 50)));

    expect(mockAPI.history['get'][0].url).toBe(`/guitars/${productMock.id}?_embed=comments`);
  });
});
