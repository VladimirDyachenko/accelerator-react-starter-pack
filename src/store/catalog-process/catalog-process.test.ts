import { datatype } from 'faker';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { CatalogProcessState } from 'types/types';
import {
  setGuitarList,
  setMinMaxPrice,
  setTotalItemsCount
} from './actions';
import { catalogProcess } from './catalog-process';

describe('Reducer: catalogProcess', () => {
  it('without additional parameters should return initial state', () => {
    const state: CatalogProcessState = {
      guitars: [],
      minMaxPrice: {
        min: 150,
        max: 300,
      },
      totalProductsCount: 20,
    };
    expect(catalogProcess(state, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should set guitars list', () => {
    const state: CatalogProcessState = {
      guitars: [],
      minMaxPrice: {
        min: 150,
        max: 300,
      },
      totalProductsCount: 20,
    };

    const guitarsListMock = new Array(datatype.number(15))
      .fill(undefined)
      .map(generateGuitarMock);

    expect(catalogProcess(state, setGuitarList(guitarsListMock)))
      .toEqual({...state, guitars: guitarsListMock});
  });

  it('should set min and max price', () => {
    const state: CatalogProcessState = {
      guitars: [],
      minMaxPrice: {
        min: 150,
        max: 300,
      },
      totalProductsCount: 20,
    };

    const minMaxPriceMock = [datatype.number(100), datatype.number(100_000)];

    expect(
      catalogProcess(state, setMinMaxPrice(minMaxPriceMock[0], minMaxPriceMock[1])),
    )
      .toEqual({...state, minMaxPrice: { min: minMaxPriceMock[0], max: minMaxPriceMock[1] }});
  });

  it('should set total products count', () => {
    const state: CatalogProcessState = {
      guitars: [],
      minMaxPrice: {
        min: 150,
        max: 300,
      },
      totalProductsCount: 0,
    };

    const totalItemsCountMock = datatype.number(100);

    expect(
      catalogProcess(state, setTotalItemsCount(totalItemsCountMock)),
    )
      .toEqual({...state, totalProductsCount: totalItemsCountMock});
  });

});
