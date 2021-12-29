import { createAction } from '@reduxjs/toolkit';
import { Guitar } from 'types/types';

export enum CatalogActionType {
  SetGuitarList = 'SetGuitarList',
}

export const setGuitarList = createAction(
  CatalogActionType.SetGuitarList,
  (guitarList: Guitar[]) => ({ payload: guitarList }),
);
