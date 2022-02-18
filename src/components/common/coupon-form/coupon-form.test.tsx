import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';

import CouponForm from './coupon-form';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { State } from 'types/types';
import { createApi } from 'services/api';
import { NameSpace } from 'store/root-reducer';
import { ApiRoute } from 'const/const';
import userEvent from '@testing-library/user-event';
import { setCoupon, setDiscount } from 'store/cart-process/actions';

const history = createMemoryHistory();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const productMock = generateGuitarMock();
const mockAPI = new MockAdapter(api);

describe('Component: CouponForm', () => {
  beforeEach(() => {
    history.push('test-page');
    mockAPI.reset();
  });

  it('should render CouponForm correctly', async () => {
    const store = mockStore({
      [NameSpace.Product]: { product: productMock },
      [NameSpace.Cart]: {
        itemsInCartList: [{ id: productMock.id, amount: 1 }],
        productsData: { [productMock.id]: productMock },
      },
    });
    const currentCoupon = null;

    render(
      <Router history={history}>
        <Provider store={store}>
          <CouponForm containerClassName='' currentCoupon={currentCoupon} />
        </Provider>
      </Router>,
    );

    const submitButton = screen.getByTestId('coupon-submit');
    const inputField = screen.getByTestId('coupon-input');

    expect(screen.getByText(/Промокод на скидку/)).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
  });
  it('should dispatch "applyCoupon"', async () => {

    const store = mockStore({
      [NameSpace.Product]: { product: productMock },
      [NameSpace.Cart]: {
        itemsInCartList: [{ id: productMock.id, amount: 1 }],
        productsData: { [productMock.id]: productMock },
      },
    });
    let currentCoupon = null;

    const coupon = 'new-coupon';
    const discount = 10;

    mockAPI.onPost(ApiRoute.Coupons).reply(200, discount);

    const { rerender } = render(
      <Router history={history}>
        <Provider store={store}>
          <CouponForm containerClassName='' currentCoupon={currentCoupon} />
        </Provider>
      </Router>,
    );

    const submitButton = screen.getByTestId('coupon-submit');
    const inputField = screen.getByTestId('coupon-input');

    userEvent.type(inputField, coupon);
    userEvent.click(submitButton);

    await waitFor(() => mockAPI.history['post'].length !== 0);

    expect(store.getActions()).toEqual([
      setDiscount(discount),
      setCoupon(coupon),
    ]);
    currentCoupon = coupon;

    rerender(
      <Router history={history}>
        <Provider store={store}>
          <CouponForm containerClassName='' currentCoupon={currentCoupon} />
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('coupon-form-success')).toBeInTheDocument();
    expect(screen.queryByTestId('coupon-form-error')).not.toBeInTheDocument();
  });

  it('should show error message', async () => {

    const store = mockStore({
      [NameSpace.Product]: { product: productMock },
      [NameSpace.Cart]: {
        itemsInCartList: [{ id: productMock.id, amount: 1 }],
        productsData: { [productMock.id]: productMock },
      },
    });
    const currentCoupon = null;
    const coupon = 'new-coupon';
    const discount = 10;

    mockAPI.onPost(ApiRoute.Coupons).reply(400, discount);

    const { rerender } = render(
      <Router history={history}>
        <Provider store={store}>
          <CouponForm containerClassName='' currentCoupon={currentCoupon} />
        </Provider>
      </Router>,
    );

    const submitButton = screen.getByTestId('coupon-submit');
    const inputField = screen.getByTestId('coupon-input');

    userEvent.type(inputField, coupon);
    userEvent.click(submitButton);

    await waitFor(() => mockAPI.history['post'].length !== 0);

    expect(store.getActions()).toEqual([
      setDiscount(0),
      setCoupon(null),
    ]);

    rerender(
      <Router history={history}>
        <Provider store={store}>
          <CouponForm containerClassName='' currentCoupon={currentCoupon} />
        </Provider>
      </Router>,
    );

    expect(screen.queryByTestId('coupon-form-success')).not.toBeInTheDocument();
    expect(screen.getByTestId('coupon-form-error')).toBeInTheDocument();
  });
});
