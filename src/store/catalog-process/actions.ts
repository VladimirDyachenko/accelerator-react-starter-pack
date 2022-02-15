import { createAction } from '@reduxjs/toolkit';
import { Guitar } from 'types/types';

export enum CatalogActionType {
  SetGuitarList = 'Catalog/SetGuitarList',
  SetMinMaxPrice = 'Catalog/SetMinMaxPrice',
  SetTotalProductsCount = 'Catalog/SetTotalProductsCount',
  SetProductsLoadingStatus = 'Catalog/SetProductsLoadingStatus',
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
  (count: number | undefined) => ({payload: count}),
);

export const setProductsLoadingStatus = createAction(
  CatalogActionType.SetProductsLoadingStatus,
  (isLoading: boolean, isError: boolean) => ({payload: { isLoading, isError }}),
);
