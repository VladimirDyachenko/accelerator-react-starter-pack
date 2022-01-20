import { createReducer } from '@reduxjs/toolkit';
import { FallbackMinMaxPrice } from 'const/const';
import { CatalogProcessState } from 'types/types';
import { setGuitarList, setProductsLoadingStatus, setMinMaxPrice, setTotalItemsCount } from './actions';

const initialState: CatalogProcessState = {
  guitars: [],
  minMaxPrice: {
    min: FallbackMinMaxPrice.min,
    max: FallbackMinMaxPrice.max,
  },
  totalProductsCount: 0, //TODO поменять начальное значение на undefined, позволит реализовать редирект если текущая страница превышает максимальное число страниц
  loadingStatus: {
    isLoading: true,
    isError: false,
  },
};

const catalogProcess = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setGuitarList, (state, action) => {
        state.guitars = action.payload;
      })
      .addCase(setMinMaxPrice, (state, action) => {
        state.minMaxPrice = { min: action.payload.min, max: action.payload.max };
      })
      .addCase(setTotalItemsCount, (state, action) => {
        state.totalProductsCount = action.payload;
      })
      .addCase(setProductsLoadingStatus, (state, action) => {
        state.loadingStatus = action.payload;
      });
  },
);

export { catalogProcess };
