import { createReducer } from '@reduxjs/toolkit';
import { ProductProcess } from 'types/store/product-process';
import { setComments, setProductData } from './actions';

const initialState: ProductProcess = {
  product: undefined,
  comments: [],
};

const productProcess = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setProductData, (state, action) => {
        state.product = action.payload;
      })
      .addCase(setComments, (state, action) => {
        state.comments = action.payload;
      });
  },
);

export { productProcess };
