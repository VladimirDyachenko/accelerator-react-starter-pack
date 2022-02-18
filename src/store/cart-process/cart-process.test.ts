import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { CartProcess } from 'types/store/cart-process';
import {
  addProduct,
  setProductCount,
  setCartData,
  setDiscount,
  setCoupon
} from './actions';
import { cartProcess } from './cart-process';

describe('Reducer: catalogProcess', () => {
  it('without additional parameters should return initial state', () => {
    const state: CartProcess = {
      inCart: [],
      productData: {},
      discount: 0,
      coupon: null,
    };

    expect(cartProcess(state, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should add item to cart', () => {
    const state: CartProcess = {
      inCart: [],
      productData: {},
      discount: 0,
      coupon: null,
    };

    const cartItem = {id: 10, amount: 1};

    expect(cartProcess(state, addProduct(cartItem.id, cartItem.amount)))
      .toEqual({...state, inCart: [cartItem]});
  });

  it('should set item in cart amount', () => {
    const cartItem = {id: 10, amount: 10};
    const state: CartProcess = {
      inCart: [{id: 22, amount: 1}, cartItem],
      productData: {},
      discount: 0,
      coupon: null,
    };

    const expectedInCart = [
      {id: 22, amount: 1},
      {id: 10, amount: 11},
    ];

    expect(cartProcess(state, setProductCount(cartItem.id, cartItem.amount + 1)))
      .toEqual({...state, inCart: expectedInCart});
  });

  it('should delete item from cart if amount is 0', () => {
    const cartItem = {id: 10, amount: 10};
    const state: CartProcess = {
      inCart: [{id: 22, amount: 1}, cartItem],
      productData: {},
      discount: 0,
      coupon: null,
    };

    const expectedInCart = [
      {id: 22, amount: 1},
    ];

    expect(cartProcess(state, setProductCount(cartItem.id, 0)))
      .toEqual({...state, inCart: expectedInCart});
  });

  it('should add item to from cart if it not exist already', () => {
    const cartItem = {id: 10, amount: 10};
    const state: CartProcess = {
      inCart: [{id: 22, amount: 1}],
      productData: {},
      discount: 0,
      coupon: null,
    };

    const expectedInCart = [
      {id: 22, amount: 1},
      cartItem,
    ];

    expect(cartProcess(state, setProductCount(cartItem.id, cartItem.amount)))
      .toEqual({...state, inCart: expectedInCart});
  });

  it('should set cart data', () => {
    const productsMock = new Array(2).fill(undefined).map(generateGuitarMock);

    const state: CartProcess = {
      inCart: [{id: 22, amount: 1}],
      productData: {},
      discount: 0,
      coupon: null,
    };

    const expected = {
      [productsMock[0].id]: productsMock[0],
      [productsMock[1].id]: productsMock[1],
    };

    expect(cartProcess(state, setCartData(productsMock)))
      .toEqual({...state, productData: expected});
  });

  it('should set discount', () => {
    const state: CartProcess = {
      inCart: [{id: 22, amount: 1}],
      productData: {},
      discount: 0,
      coupon: null,
    };

    const discount = 50;

    expect(cartProcess(state, setDiscount(discount)))
      .toEqual({...state, discount});
  });

  it('should set coupon', () => {
    const state: CartProcess = {
      inCart: [{id: 22, amount: 1}],
      productData: {},
      discount: 0,
      coupon: null,
    };

    const coupon = 'new-coupon';

    expect(cartProcess(state, setCoupon(coupon)))
      .toEqual({...state, coupon});
  });
});
