import { Guitar } from 'types/types';

export type CatalogProcessState = {
  guitars: Guitar[];
  minMaxPrice: { min: number, max: number };
  totalProductsCount: number;
  loadingStatus: {
    isLoading: boolean,
    isError: boolean,
  };
}
