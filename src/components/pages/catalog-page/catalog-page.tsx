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

function CatalogPage(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  const minMaxPrice = useSelector(getMinMaxPrice);
  const {
    filterState,
    dispatch: onUpdateFilter,
    searchQuery: filterSearchQuery,
  } = useCatalogFilter();
  const [selectedSort, setSelectedSort] = useState<SortOption>({order: undefined, sortProperty: undefined });
  const [sortSearchQuery, setSortSearchQuery] = useState('');

  const onSetSort = useCallback((sort: SortOption) => {
    if (sort.order === undefined) {
      sort.order = 'acs';
    }

    if (sort.sortProperty === undefined) {
      sort.sortProperty = 'price';
    }

    setSelectedSort(sort);
    setSortSearchQuery(`_sort=${sort.sortProperty ?? 'price'}&_order=${sort.order ?? 'acs'}`);
  }, []);

  const fetchGuitars = useCallback((query) => dispatch(fetchGuitarList(query)), [dispatch]);

  const { page } = useParams<{page: string}>();
  const totalItems = useSelector(getTotalItemsCount);
  const currentPage = useMemo(() => parseInt(page, 10), [page]);

  useEffect(() => {
    history.push({
      search: filterSearchQuery,
    });
  }, [history, filterSearchQuery]);

  useEffect(() => {

    const start = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;

    fetchGuitars(`_start=${start}&${filterSearchQuery}&${sortSearchQuery}`);
  }, [fetchGuitars, filterSearchQuery, sortSearchQuery, currentPage]);

  if (isNaN(currentPage) || currentPage < 1) {
    return (
      <Redirect to={`${AppRoute.Catalog}/1`} />
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
            <Sort currentOption={selectedSort} onSetSort={onSetSort} />
            <ProductList />
            <Paginator
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={totalItems}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
