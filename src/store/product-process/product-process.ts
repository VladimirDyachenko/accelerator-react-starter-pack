import { createReducer } from '@reduxjs/toolkit';
import { ProductProcess } from 'types/store/product-process';
import { addProductComment, setProductData } from './actions';

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
      })
      .addCase(addProductComment, (state, action) => {
        if (state.product) {
          const oldComments = state.product?.comments ?? [];
          const updatedComments = [action.payload, ...oldComments];
          state.product.comments = updatedComments;
        }
      });
  },
);

export { productProcess };
