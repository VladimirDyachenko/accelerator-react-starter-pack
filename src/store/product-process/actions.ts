import { createAction } from '@reduxjs/toolkit';
import { Comment, Guitar } from 'types/types';

export enum ProductActionType {
  SetProductData = 'Product/SetProductData',
  AddProductComment = 'Product/AddProductComment',
}

export const setProductData = createAction(
  ProductActionType.SetProductData,
  (productData: Guitar) => ({payload: productData}),
);

export const addProductComment = createAction(
  ProductActionType.AddProductComment,
  (comment: Comment) => ({payload: comment}),
);
