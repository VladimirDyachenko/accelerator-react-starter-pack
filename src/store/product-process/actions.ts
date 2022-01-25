import { createAction } from '@reduxjs/toolkit';
import { Guitar } from 'types/types';

export enum ProductActionType {
  SetProductData = 'SetProductData',
}

export const setProductData = createAction(
  ProductActionType.SetProductData,
  (productData: Guitar) => ({payload: productData}),
);
