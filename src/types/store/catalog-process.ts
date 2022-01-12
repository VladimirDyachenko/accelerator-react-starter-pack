import { Guitar } from 'types/types';

export type CatalogProcessState = {
  guitars: Guitar[];
  minMaxPrice: [number, number];
}
