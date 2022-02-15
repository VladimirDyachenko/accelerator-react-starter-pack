import { createAction } from '@reduxjs/toolkit';
import { Guitar } from 'types/types';

export enum CartActionType {
  AddProduct = 'Cart/AddProduct',
  RemoveProduct = 'Cart/RemoveProduct',
  SetProductData = 'Cart/SetCartData',
}

export const addProduct = createAction(
  CartActionType.AddProduct,
  (id: number, amount: number) => ({ payload: { id, amount } }),
);

export const removeProduct = createAction(
  CartActionType.RemoveProduct,
  (id: number, amount: number) => ({ payload: { id, amount } }),
);

export const setCartData = createAction(
  CartActionType.SetProductData,
  (products: Guitar[]) => ({ payload: products }),
);
