import { createAction } from '@reduxjs/toolkit';
import { Guitar } from 'types/guitars';

export enum CatalogActionType {
  SetGuitarList = 'SetGuitarList',
}

export const setGuitarList = createAction(
  CatalogActionType.SetGuitarList,
  (guitarList: Guitar[]) => ({ payload: guitarList }),
);
