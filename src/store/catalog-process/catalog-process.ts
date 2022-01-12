import { createReducer } from '@reduxjs/toolkit';
import { FALLBACK_FILTER_MAX_PRICE, FALLBACK_FILTER_MIN_PRICE } from 'const/const';
import { CatalogProcessState } from 'types/types';
import { setGuitarList, setMinMaxPrice } from './actions';

const initialState: CatalogProcessState = {
  guitars: [],
  minMaxPrice: [FALLBACK_FILTER_MIN_PRICE, FALLBACK_FILTER_MAX_PRICE],
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
      });
  },
);

export { catalogProcess };
