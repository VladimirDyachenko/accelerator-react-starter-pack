import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

import { generateGuitarMock } from 'mock/generate-guitar-mock';
import ProductCard from './product-card';
import { createApi } from 'services/api';
import { State } from 'types/types';
import { NameSpace } from 'store/root-reducer';

const history = createMemoryHistory();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const productMock = generateGuitarMock();
const store = mockStore({
  [NameSpace.Product]: {product: productMock},
  [NameSpace.Cart]: {itemsInCartList: []},
});

describe('Component: ProductCard', () => {
  beforeEach(() => {
    history.push('/product-page');
  });
  it('should render ProductCard correctly', () => {
    const product = generateGuitarMock();
    product.price = 15000;

    render(
      <Router history={history}>
        <Provider store={store}>
          <ProductCard product={product} />
        </Provider>
      </Router>,
    );

    expect(screen.getByText(/15 000/)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByTestId('product-card-title')).toHaveTextContent(product.name);
  });

});
