import { combineReducers } from '@reduxjs/toolkit';
import { catalogProcess } from './catalog-process/catalog-process';
import { productProcess } from './product-process/product-process';

export const NameSpace = {
  Catalog: 'CATALOG',
  Product: 'PRODUCT',
} as const;

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogProcess,
  [NameSpace.Product]: productProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
