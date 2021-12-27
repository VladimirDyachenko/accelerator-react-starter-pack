import { configureStore } from '@reduxjs/toolkit';
import { setGuitarList } from './catalog-process/actions';
import { rootReducer } from './root-reducer';

import mockGuitars from 'mock/guitars.json';
import { Guitar } from 'types/guitars';
import { createApi } from 'services/api';

const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

store.dispatch(setGuitarList(mockGuitars as Guitar[]));

export { store };
