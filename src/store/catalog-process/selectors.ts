import { NameSpace } from 'store/root-reducer';
import { Guitar } from 'types/guitars';
import { State } from 'types/store/store';

export const getGuitarList = (state: State): Guitar[] => state[NameSpace.Catalog].guitars;
