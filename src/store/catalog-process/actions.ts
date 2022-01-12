import { createAction } from '@reduxjs/toolkit';
import { Guitar } from 'types/types';

export enum CatalogActionType {
  SetGuitarList = 'SetGuitarList',
  SetMinMaxPrice = 'SetMinMaxPrice',
}

export const setGuitarList = createAction(
  CatalogActionType.SetGuitarList,
  (guitarList: Guitar[]) => ({ payload: guitarList }),
);

export const setMinMaxPrice = createAction(
  CatalogActionType.SetMinMaxPrice,
  (min:number, max: number) => ({payload: [min, max]}),
);
