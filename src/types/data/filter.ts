import { GuitarType, StringsCount } from 'types/types';

export interface IFilter {
  minPrice: string,
  maxPrice: string,
  selectedGuitarsTypes: {
    [key in GuitarType]: boolean;
  };
  selectedStringsCounts: {
    [key in StringsCount]: boolean;
  };
  getIsStringsCountValid: (stringCount: StringsCount) => boolean;
}
