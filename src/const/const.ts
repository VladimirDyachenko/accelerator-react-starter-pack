import { GuitarType, IFilter } from 'types/types';

export enum AppRoute {
  Home = '/',
  Catalog = '/catalog',
  Cart = '/cart',
  Product = '/product',
}

export enum ApiRoute {
  Guitars = '/guitars',
}

export const Api = {
  Url: 'https://accelerator-guitar-shop-api-v1.glitch.me',
  RequestTimeOut: 5000,
};

export const FALLBACK_FILTER_MIN_PRICE = 0;
export const FALLBACK_FILTER_MAX_PRICE = 100_000;

export const initialFilter: IFilter = {
  minPrice: '',
  maxPrice: '',
  selectedGuitarsTypes: {
    [GuitarType.Acoustic]: false,
    [GuitarType.Electric]: false,
    [GuitarType.Ukulele]: false,
  },
  selectedStringsCounts: {
    '4': false,
    '6': false,
    '7': false,
    '12': false,
  },
  getIsStringsCountValid(stringCount) {
    if (
      this.selectedGuitarsTypes[GuitarType.Ukulele] === false
      && this.selectedGuitarsTypes[GuitarType.Acoustic] === false
      && this.selectedGuitarsTypes[GuitarType.Electric] === false
    ) {
      return true;
    }

    switch (stringCount) {
      case 4:
        return this.selectedGuitarsTypes[GuitarType.Ukulele] || this.selectedGuitarsTypes[GuitarType.Electric];
      case 6:
        return this.selectedGuitarsTypes[GuitarType.Acoustic] || this.selectedGuitarsTypes[GuitarType.Electric];
      case 7:
        return this.selectedGuitarsTypes[GuitarType.Acoustic] || this.selectedGuitarsTypes[GuitarType.Electric];
      case 12:
        return this.selectedGuitarsTypes[GuitarType.Acoustic];
      default:
        return true;
    }
  },
};

export const QueryParams = {
  MinPrice: 'price_gte',
  MaxPrice: 'price_lte',
  GuitarType: 'type_like',
  StringCount: 'stringCount_like',
};
