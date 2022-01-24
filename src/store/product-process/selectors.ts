import { NameSpace } from 'store/root-reducer';
import { Guitar, State, Comment } from 'types/types';

export const getProductData = (state: State): Guitar | undefined => state[NameSpace.Product].product;

export const getComments = (state: State): Comment[] => state[NameSpace.Product].comments;
