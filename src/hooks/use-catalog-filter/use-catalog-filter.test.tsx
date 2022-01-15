import { renderHook, act } from '@testing-library/react-hooks';
import { initialFilter, QueryParams } from 'const/const';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { GuitarType } from 'types/types';
import useCatalogFilter from './use-catalog-filter';

const history = createMemoryHistory();

describe('Hook: useCatalogFilter', () => {
  history.push({
    pathname: '/',
    search: '',
  });

  it('should return correct search query based on URL search params', () => {
    history.push(`/?${QueryParams.MinPrice}=100&${QueryParams.MaxPrice}=1000&${QueryParams.StringCount}=4&${QueryParams.GuitarType}=electric`);

    const { result, unmount } = renderHook(
      useCatalogFilter,
      {wrapper: ({ children }) => (<Router history={history}>{children}</Router>)},
    );

    expect(result.current.searchQuery).toEqual('price_gte=100&price_lte=1000&type_like=electric&stringCount_like=4');
    unmount();
  });

  it('should return empty string when no URL search params', () => {
    history.push({
      pathname: '/',
      search: '',
    });

    const { result } = renderHook(
      useCatalogFilter,
      {wrapper: ({ children }) => (<Router history={history}>{children}</Router>)},
    );

    expect(result.current.searchQuery).toEqual('');
  });

  it('should update filter state', async () => {
    history.push({
      pathname: '/',
      search: '',
    });

    const { result } = renderHook(
      useCatalogFilter,
      {wrapper: ({ children }) => (<Router history={history}>{children}</Router>)},
    );

    act(() => result.current.dispatch({ type: 'setMinPrice', payload: '4200' }));
    expect(result.current.filterState.minPrice).toEqual('4200');

    act(() => result.current.dispatch({ type: 'setMaxPrice', payload: '14200' }));
    expect(result.current.filterState.maxPrice).toEqual('14200');

    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 4 }));
    expect(result.current.filterState.selectedStringsCounts['4']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['6']).toBe(false);
    expect(result.current.filterState.selectedStringsCounts['7']).toBe(false);
    expect(result.current.filterState.selectedStringsCounts['12']).toBe(false);

    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 6 }));
    expect(result.current.filterState.selectedStringsCounts['4']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['6']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['7']).toBe(false);
    expect(result.current.filterState.selectedStringsCounts['12']).toBe(false);

    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 7 }));
    expect(result.current.filterState.selectedStringsCounts['4']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['6']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['7']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['12']).toBe(false);

    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 12 }));
    expect(result.current.filterState.selectedStringsCounts['4']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['6']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['7']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['12']).toBe(true);

    act(() => result.current.dispatch({ type: 'toggleGuitarType', payload: GuitarType.Acoustic }));
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Acoustic]).toBe(true);
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Electric]).toBe(false);
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Ukulele]).toBe(false);

    act(() => result.current.dispatch({ type: 'toggleGuitarType', payload: GuitarType.Electric }));
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Acoustic]).toBe(true);
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Electric]).toBe(true);
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Ukulele]).toBe(false);

    act(() => result.current.dispatch({ type: 'toggleGuitarType', payload: GuitarType.Ukulele }));
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Acoustic]).toBe(true);
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Electric]).toBe(true);
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Ukulele]).toBe(true);
  });

  it('should set to false all filters expect \'4\' strings after Ukulele pick', async () => {
    history.push({
      pathname: '/',
      search: '',
    });

    const { result } = renderHook(
      useCatalogFilter,
      {wrapper: ({ children }) => (<Router history={history}>{children}</Router>)},
    );

    expect(result.current.filterState).toEqual(initialFilter);

    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 4 }));
    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 6 }));
    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 7 }));
    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 12 }));


    act(() => result.current.dispatch({ type: 'toggleGuitarType', payload: GuitarType.Ukulele }));
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Ukulele]).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['4']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['6']).toBe(false);
    expect(result.current.filterState.selectedStringsCounts['7']).toBe(false);
    expect(result.current.filterState.selectedStringsCounts['12']).toBe(false);
  });

  it('should set to false all filters expect \'4, 6, 7\' strings after \'Electric\' pick', async () => {
    history.push({
      pathname: '/',
      search: '',
    });

    const { result } = renderHook(
      useCatalogFilter,
      {wrapper: ({ children }) => (<Router history={history}>{children}</Router>)},
    );

    expect(result.current.filterState).toEqual(initialFilter);

    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 4 }));
    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 6 }));
    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 7 }));
    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 12 }));


    act(() => result.current.dispatch({ type: 'toggleGuitarType', payload: GuitarType.Electric }));
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Electric]).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['4']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['6']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['7']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['12']).toBe(false);
  });

  it('should set to false all filters expect \'6, 7, 12\' strings after \'Electric\' pick', async () => {
    history.push({
      pathname: '/',
      search: '',
    });

    const { result } = renderHook(
      useCatalogFilter,
      {wrapper: ({ children }) => (<Router history={history}>{children}</Router>)},
    );

    expect(result.current.filterState).toEqual(initialFilter);

    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 4 }));
    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 6 }));
    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 7 }));
    act(() => result.current.dispatch({ type: 'toggleStringCount', payload: 12 }));


    act(() => result.current.dispatch({ type: 'toggleGuitarType', payload: GuitarType.Acoustic }));
    expect(result.current.filterState.selectedGuitarsTypes[GuitarType.Acoustic]).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['4']).toBe(false);
    expect(result.current.filterState.selectedStringsCounts['6']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['7']).toBe(true);
    expect(result.current.filterState.selectedStringsCounts['12']).toBe(true);
  });
});
