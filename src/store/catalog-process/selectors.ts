import { NameSpace } from 'store/root-reducer';
import { Guitar, State } from 'types/types';

export const getGuitarList = (state: State): Guitar[] => state[NameSpace.Catalog].guitars;
