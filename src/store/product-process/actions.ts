import { createAction } from '@reduxjs/toolkit';
import { Guitar, Comment } from 'types/types';

export enum ProductActionType {
  SetProductData = 'SetProductData',
  SetProductLoadingError = 'SetProductLoadingError',
  SetComments = 'SetComments',
  SetCommentsLoadingError = 'SetCommentsLoadingError',
}

export const setProductData = createAction(
  ProductActionType.SetProductData,
  (productData: Guitar) => ({payload: productData}),
);

export const setComments = createAction(
  ProductActionType.SetComments,
  (comments: Comment[]) => ({payload: comments}),
);
