import { createReducer } from '@reduxjs/toolkit';
import { CartProcess } from 'types/store/cart-process';
import { addProduct, setCartData, setProductCount } from './actions';

const initialState: CartProcess = {
  inCart: [],
  productData: {},
};

const cartProcess = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(addProduct, (state, action) => {
        const index = state.inCart.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.inCart[index].amount += action.payload.amount;
        } else {
          state.inCart.push(action.payload);
        }
      })
      .addCase(setProductCount, (state, action) => {
        if (action.payload.amount < 1) {
          state.inCart = state.inCart.filter((item) => item.id !== action.payload.id);
          return;
        }
        const index = state.inCart.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.inCart[index].amount = action.payload.amount;
        } else {
          state.inCart.push(action.payload);
        }
      })
      .addCase(setCartData, (state, action) => {
        action.payload.forEach((product) => state.productData[product.id] = product);
      });
  },
);

export { cartProcess };
