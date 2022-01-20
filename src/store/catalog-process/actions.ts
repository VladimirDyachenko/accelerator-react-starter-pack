import { createAction } from '@reduxjs/toolkit';
import { Guitar } from 'types/types';

export enum CatalogActionType {
  SetGuitarList = 'SetGuitarList',
  SetMinMaxPrice = 'SetMinMaxPrice',
  SetTotalProductsCount = 'SetTotalProductsCount',
  SetProductsLoadingStatus = 'SetProductsLoadingStatus',
}

export const setGuitarList = createAction(
  CatalogActionType.SetGuitarList,
  (guitarList: Guitar[]) => ({ payload: guitarList }),
);

export const setMinMaxPrice = createAction(
  CatalogActionType.SetMinMaxPrice,
  (min:number, max: number) => ({payload: { min, max }}),
);

export const setTotalItemsCount = createAction(
  CatalogActionType.SetTotalProductsCount,
  (count: number) => ({payload: count}),
);

export const setProductsLoadingStatus = createAction(
  CatalogActionType.SetProductsLoadingStatus,
  (isLoading: boolean, isError: boolean) => ({payload: { isLoading, isError }}),
);
