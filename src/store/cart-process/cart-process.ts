import { createReducer } from '@reduxjs/toolkit';
import { CartProcess } from 'types/store/cart-process';
import { addProduct, setCartData, setCoupon, setDiscount, setProductCount } from './actions';

const initialState: CartProcess = {
  itemsInCartList: [],
  productsData: {},
  discount: 0,
  coupon: null,
};

const cartProcess = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(addProduct, (state, action) => {
        const index = state.itemsInCartList.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.itemsInCartList[index].amount += action.payload.amount;
        } else {
          state.itemsInCartList.push(action.payload);
        }
      })
      .addCase(setProductCount, (state, action) => {
        if (action.payload.amount < 1) {
          state.itemsInCartList = state.itemsInCartList.filter((item) => item.id !== action.payload.id);
          return;
        }
        const index = state.itemsInCartList.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.itemsInCartList[index].amount = action.payload.amount;
        } else {
          state.itemsInCartList.push(action.payload);
        }
      })
      .addCase(setCartData, (state, action) => {
        action.payload.forEach((product) => state.productsData[product.id] = product);
      })
      .addCase(setDiscount, (state, action) => {
        state.discount = action.payload;
      })
      .addCase(setCoupon, (state, action) => {
        state.coupon = action.payload;
      });
  },
);

export { cartProcess };
