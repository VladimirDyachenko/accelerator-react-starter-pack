import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

import CartPage from './cart-page';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { State } from 'types/types';
import { createApi } from 'services/api';
import { NameSpace } from 'store/root-reducer';

const history = createMemoryHistory();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const productMock = generateGuitarMock();
const store = mockStore({
  [NameSpace.Product]: {product: productMock},
  [NameSpace.Cart]: {
    inCart: [{id: productMock.id, amount: 1}],
    productData: {[productMock.id]: productMock},
  },
});

describe('Component: CartPage', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render CartPage correctly', () => {

    render(
      <Router history={history}>
        <Provider store={store}>
          <CartPage />
        </Provider>
      </Router>,
    );

    expect(screen.getByText('Промокод на скидку')).toBeInTheDocument();
  });
});
