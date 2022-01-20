import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Breadcrumbs, Footer, Header, Paginator } from 'components/common/common';
import { AppRoute, ITEMS_PER_PAGE } from 'const/const';
import useCatalogFilter from 'hooks/use-catalog-filter/use-catalog-filter';
import { fetchGuitarList } from 'store/api-actions';
import { getMinMaxPrice, getTotalItemsCount } from 'store/catalog-process/selectors';
import { SortOption } from 'types/types';
import { ProductList, Filter, Sort } from './components/components';
import { setTotalItemsCount } from 'store/catalog-process/actions';

function CatalogPage(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const minMaxPrice = useSelector(getMinMaxPrice);
  const {
    filterState,
    dispatch: onUpdateFilter,
    searchQuery: filterSearchQuery,
  } = useCatalogFilter();
  const [sortSearchQuery, setSortSearchQuery] = useState('');
  const fetchGuitars = useCallback((query) => dispatch(fetchGuitarList(query)), [dispatch]);
  const onSortChange = useCallback((newSort: SortOption) => {
    if (newSort.sortProperty === undefined && newSort.order === undefined) {
      return setSortSearchQuery('');
    }

    setSortSearchQuery(`_sort=${newSort.sortProperty ?? 'price'}&_order=${newSort.order ?? 'acs'}`);
  }, []);

  const { page } = useParams<{page: string}>();
  const totalItems = useSelector(getTotalItemsCount);
  const currentPage = useMemo(() => parseInt(page, 10), [page]);

  const combinedQuery = useMemo(() => {
    let searchQuery = '';

    if (filterSearchQuery !== '') {
      searchQuery += filterSearchQuery;
    }

    if (sortSearchQuery !== '') {
      searchQuery += `&${sortSearchQuery}`;
    }

    return searchQuery;
  }, [filterSearchQuery, sortSearchQuery]);

  useEffect(() => {
    history.push({
      search: combinedQuery,
    });
  }, [history, combinedQuery]);

  useEffect(() => {
    const start = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
    fetchGuitars(`_start=${start}&${combinedQuery}`);
  }, [fetchGuitars, currentPage, combinedQuery]);

  useEffect(() => function () {
    dispatch(setTotalItemsCount(undefined));
  }, [dispatch]);

  if (isNaN(currentPage) || currentPage < 1) {
    return (
      <Redirect to={`${AppRoute.Catalog}/1${history.location.search}`} />
    );
  }

  if (totalItems !== undefined && currentPage > Math.ceil(totalItems / ITEMS_PER_PAGE)) {
    return (
      <Redirect to={`${AppRoute.Catalog}/1${history.location.search}`} />
    );
  }

  return (
    <div className='wrapper'>
      <Header />
      <main className='page-content'>
        <div className='container'>
          <h1 className='page-content__title title title--bigger'>
            Каталог гитар
          </h1>
          <Breadcrumbs
            items={
              [
                {label: 'Главная', to: AppRoute.Home},
                {label: 'Каталог', to: AppRoute.Catalog},
              ]
            }
          />
          <div className='catalog'>
            <Filter
              filterState={filterState}
              minMaxPrice={minMaxPrice}
              onUpdateFilter={onUpdateFilter}
            />
            <Sort onSortChange={onSortChange}/>
            <ProductList />

            {totalItems !== undefined &&
            <Paginator
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={totalItems}
            />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
