import { createReducer } from '@reduxjs/toolkit';
import { FALLBACK_FILTER_MAX_PRICE, FALLBACK_FILTER_MIN_PRICE } from 'const/const';
import { CatalogProcessState } from 'types/types';
import { setGuitarList, setMinMaxPrice, setTotalItemsCount } from './actions';

const initialState: CatalogProcessState = {
  guitars: [],
  minMaxPrice: [FALLBACK_FILTER_MIN_PRICE, FALLBACK_FILTER_MAX_PRICE],
  totalProductsCount: 0,
};

const catalogProcess = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setGuitarList, (state, action) => {
        state.guitars = action.payload;
      })
      .addCase(setMinMaxPrice, (state, action) => {
        state.minMaxPrice = [action.payload[0], action.payload[1]];
      })
      .addCase(setTotalItemsCount, (state, action) => {
        state.totalProductsCount = action.payload;
      });
  },
);

export { catalogProcess };
