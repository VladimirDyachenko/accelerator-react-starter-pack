import { GuitarType, IFilter } from 'types/types';

export enum AppRoute {
  Home = '/',
  Catalog = '/catalog',
  Cart = '/cart',
  Product = '/product',
}

export enum ApiRoute {
  Guitars = '/guitars',
  Comments = '/comments',
  Coupons = '/coupons',
}

export const Api = {
  Url: process.env.REACT_APP_API_URL ?? 'https://accelerator-guitar-shop-api-v1.glitch.me',
  RequestTimeOut: 5000,
} as const;

export const FallbackPrice = {
  Min: 0,
  Max: 100_000,
} as const;

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
} as const;

export const QueryParam = {
  MinPrice: 'price_gte',
  MaxPrice: 'price_lte',
  GuitarType: 'type_like',
  StringCount: 'stringCount_like',
} as const;

export const ITEMS_PER_PAGE = 9;

export const TabOption = {
  Characteristics: '#characteristics',
  Description: '#description',
} as const;

export const GuitarTypeToLabelMap = {
  [GuitarType.Acoustic]: 'Акустическая',
  [GuitarType.Ukulele]: 'Укулеле',
  [GuitarType.Electric]: 'Электрогитара',
};

export const HttpCode = {
  NotFound: 404,
};

export const REVIEWS_PER_STEP = 3;

export const ratingOptions = [
  {label: 'Ужасно', value: '1'},
  {label: 'Плохо', value: '2'},
  {label: 'Нормально', value: '3'},
  {label: 'Хорошо', value: '4'},
  {label: 'Отлично', value: '5'},
];

export const formatPrice = (price: number) => price.toLocaleString('ru-RU', {minimumFractionDigits: 0, maximumFractionDigits: 2});
