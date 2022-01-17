import { useDebugValue, useEffect, useReducer, useState } from 'react';
import { initialFilter, QueryParam } from 'const/const';
import { GuitarType, StringsCount, IFilter } from 'types/types';
import { useHistory } from 'react-router-dom';

export type UpdateFilterAction =
  { type: 'setMinPrice', payload: string }
  | { type: 'setMaxPrice', payload: string }
  | { type: 'toggleStringCount', payload: StringsCount }
  | { type: 'toggleGuitarType', payload: GuitarType }

function reducer(state: IFilter, action: UpdateFilterAction) {
  const newState = { ...state };

  switch (action.type) {
    case 'setMinPrice':
      isNaN(parseInt(action.payload, 10))
        ? newState.minPrice = ''
        : newState.minPrice = Math.max(parseInt(action.payload, 10), 0).toString();
      return newState;
    case 'setMaxPrice':
      isNaN(parseInt(action.payload, 10))
        ? newState.maxPrice = ''
        : newState.maxPrice = Math.max(parseInt(action.payload, 10), 0).toString();
      return newState;
    case 'toggleStringCount':
      newState.selectedStringsCounts = {
        ...newState.selectedStringsCounts,
        [action.payload]: !newState.selectedStringsCounts[action.payload],
      };
      return newState;
    case 'toggleGuitarType':
      newState.selectedGuitarsTypes = {
        ...newState.selectedGuitarsTypes,
        [action.payload]: !newState.selectedGuitarsTypes[action.payload],
      };

      if (newState.selectedStringsCounts[4] && !newState.getIsStringsCountValid(4)) {
        newState.selectedStringsCounts[4] = false;
      }
      if (newState.selectedStringsCounts[6] && !newState.getIsStringsCountValid(6)) {
        newState.selectedStringsCounts[6] = false;
      }
      if (newState.selectedStringsCounts[7] && !newState.getIsStringsCountValid(7)) {
        newState.selectedStringsCounts[7] = false;
      }
      if (newState.selectedStringsCounts[12] && !newState.getIsStringsCountValid(12)) {
        newState.selectedStringsCounts[12] = false;
      }

      newState.selectedStringsCounts = { ...newState.selectedStringsCounts };

      return newState;
    default:
      throw new Error(`Missing action: ${JSON.stringify(action, null, 2)}`);
  }
}

function getInitialFilter(searchQuery: string): IFilter {
  const newFilter = {
    ...initialFilter,
    selectedStringsCounts: {...initialFilter.selectedStringsCounts},
    selectedGuitarsTypes: {...initialFilter.selectedGuitarsTypes},
  };
  const params = new URLSearchParams(searchQuery);

  const minPrice = params.get(QueryParam.MinPrice);
  const maxPrice = params.get(QueryParam.MaxPrice);
  const guitarType = params.getAll(QueryParam.GuitarType);
  const stringCount = params.getAll(QueryParam.StringCount);

  if (minPrice !== null) {
    newFilter.minPrice = minPrice;
  }

  if (maxPrice !== null) {
    newFilter.maxPrice = maxPrice;
  }

  if (guitarType.length > 0) {
    guitarType.forEach((type) => {
      if (newFilter.selectedGuitarsTypes[(type as GuitarType)] !== undefined ) {
        newFilter.selectedGuitarsTypes[(type as GuitarType)] = true;
      }
    });
  }

  if (stringCount.length > 0) {
    stringCount.forEach((count) => {
      if (newFilter.selectedStringsCounts[(count as unknown as StringsCount)] !== undefined ) {
        newFilter.selectedStringsCounts[(count as unknown as StringsCount)] = true;
      }
    });
  }

  return newFilter;
}

function useCatalogFilter() {
  const history = useHistory();
  const [filterState, dispatch] = useReducer(reducer, history.location.search, getInitialFilter);
  const [searchQuery, setSearchQuery] = useState(history.location.search.replace('?', ''));
  useDebugValue(filterState);

  //Собирает URLSearchParams на основе фильтра
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filterState.minPrice !== '') {
      queryParams.set(QueryParam.MinPrice, filterState.minPrice);
    }

    if (filterState.maxPrice !== '') {
      queryParams.set(QueryParam.MaxPrice, filterState.maxPrice);
    }

    Object.entries(filterState.selectedGuitarsTypes)
      .forEach((element) => {
        if (element[1]) {
          queryParams.append(QueryParam.GuitarType, element[0]);
        }
      });

    Object.entries(filterState.selectedStringsCounts)
      .forEach((element) => {
        if (element[1]) {
          queryParams.append(QueryParam.StringCount, element[0]);
        }
      });

    setSearchQuery(queryParams.toString());
  }, [filterState]);

  return { filterState, dispatch, searchQuery };
}

export default useCatalogFilter;
