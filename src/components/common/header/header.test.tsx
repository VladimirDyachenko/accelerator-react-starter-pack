import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

import Header from './header';
import { createApi } from 'services/api';
import { State } from 'types/types';
import { NameSpace } from 'store/root-reducer';

const history = createMemoryHistory();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore({
  [NameSpace.Cart]: {itemsInCartList: []},
});

describe('Component: Header', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render Header correctly', () => {
    render(
      <Router history={history}>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>,
    );

    expect(screen.getByText(/Каталог/)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/)).toBeInTheDocument();
    expect(screen.getByText(/О компании/)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/)).toBeInTheDocument();
  });

});
