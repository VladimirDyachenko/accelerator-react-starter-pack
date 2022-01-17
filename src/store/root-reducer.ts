import { combineReducers } from '@reduxjs/toolkit';
import { catalogProcess } from './catalog-process/catalog-process';

export const NameSpace = {
  Catalog: 'CATALOG',
} as const;

export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
