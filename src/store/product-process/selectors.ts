import { NameSpace } from 'store/root-reducer';
import { Guitar, State } from 'types/types';

export const getProductData = (state: State): Guitar | undefined => state[NameSpace.Product].product;
