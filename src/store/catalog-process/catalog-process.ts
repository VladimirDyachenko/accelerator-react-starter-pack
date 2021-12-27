import { createReducer } from '@reduxjs/toolkit';
import { CatalogProcessState } from 'types/store/catalog-process';
import { setGuitarList } from './actions';

const initialState: CatalogProcessState = {
  guitars: [],
};

const catalogProcess = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setGuitarList, (state, action) => {
        state.guitars = action.payload;
      });
  },
);

export { catalogProcess };
