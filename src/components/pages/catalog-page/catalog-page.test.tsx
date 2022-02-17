import { datatype } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { createMemoryHistory } from 'history';
import { NameSpace } from 'store/root-reducer';
import { createApi } from 'services/api';
import CatalogPage from './catalog-page';
import { State } from 'types/types';
import { ApiRoute, AppRoute } from 'const/const';

const history = createMemoryHistory();
const api = createApi();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const guitarsList = new Array(datatype.number(10)).fill(undefined).map(generateGuitarMock);

const store = mockStore(
  {
    [NameSpace.Catalog]: {
      guitars: guitarsList,
      minMaxPrice: {
        min: 100,
        max: 1000,
      },
      totalProductsCount: 1,
      loadingStatus: {
        isLoading: false,
        isError: false,
      },
    },
    [NameSpace.Cart]: {inCart: []},
  },
);

describe('Page: CatalogPage', () => {
  beforeEach(() => {
    history.push(`${AppRoute.Catalog}/1`);
  });

  it('should render CatalogPage correctly', () => {
    mockAPI.onGet(ApiRoute.Guitars).reply(200, []);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={`${AppRoute.Catalog}/:page?`}>
            <CatalogPage />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Каталог гитар/))
      .toBeInTheDocument();
    expect(screen.getByText(/Фильтр/))
      .toBeInTheDocument();
    expect(screen.getByText(/Сортировать/))
      .toBeInTheDocument();
    expect(screen.getByTestId('page-link'))
      .toBeInTheDocument();
  });

  it(`should redirect to ${AppRoute.Catalog}/1 becaus of invalid page index`, () => {
    mockAPI
      .onGet(ApiRoute.Guitars)
      .reply(200, []);

    history.push(`${AppRoute.Catalog}/NaN`);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={`${AppRoute.Catalog}/:page?`}>
            <CatalogPage />
          </Route>
        </Router>
      </Provider>,
    );

    expect(history.location.pathname)
      .toBe(`${AppRoute.Catalog}/1`);
  });

});
