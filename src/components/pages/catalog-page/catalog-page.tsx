import { Breadcrumbs, Footer, Header, Paginator } from 'components/common/common';
import { AppRoute } from 'const/const';
import useCatalogFilter from 'hooks/use-catalog-filter/use-catalog-filter';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchGuitarList } from 'store/api-actions';
import { getMinMaxPrice } from 'store/catalog-process/selectors';
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

  //Обновление search и получение актуального списка гитар
  useEffect(() => {
    history.push({
      search: filterSearchQuery,
    });

    fetchGuitars(`${filterSearchQuery}&${sortSearchQuery}`);
  }, [dispatch, fetchGuitars, history, filterSearchQuery, sortSearchQuery]);

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
            <Paginator />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
