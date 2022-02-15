import { combineReducers } from '@reduxjs/toolkit';
import { cartProcess } from './cart-process/cart-process';
import { catalogProcess } from './catalog-process/catalog-process';
import { productProcess } from './product-process/product-process';

export const NameSpace = {
  Catalog: 'CATALOG',
  Product: 'PRODUCT',
  Cart: 'CART',
} as const;

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogProcess,
  [NameSpace.Product]: productProcess,
  [NameSpace.Cart]: cartProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
