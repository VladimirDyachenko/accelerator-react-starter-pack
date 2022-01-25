import { createReducer } from '@reduxjs/toolkit';
import { ProductProcess } from 'types/store/product-process';
import { setProductData } from './actions';

const initialState: ProductProcess = {
  product: undefined,
};

const productProcess = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setProductData, (state, action) => {
        action.payload.comments.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt));
        state.product = action.payload;
      });
  },
);

export { productProcess };
