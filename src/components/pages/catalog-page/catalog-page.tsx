import { Breadcrumbs, Footer, Header, Paginator } from 'components/common/common';
import { AppRoute } from 'const/const';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGuitarList } from 'store/api-actions';
import { SortOption } from 'types/types';
import { ProductList, Filter, Sort } from './components/components';

function CatalogPage(): JSX.Element {
  const dispatch = useDispatch();
  const [selectedSort, setSelectedSort] = useState<SortOption>({order: undefined, sortProperty: undefined });

  //TODO передавать в fetchGuitarList объект с фильтром, сортировкой и пагинацией. Собирать query в thunk action'е
  const onSetSort = useCallback((sort: SortOption) => {
    if (sort.order === undefined) {
      sort.order = 'acs';
    }

    if (sort.sortProperty === undefined) {
      sort.sortProperty = 'price';
    }

    setSelectedSort(sort);

    const query = `_sort=${sort.sortProperty ?? 'price'}&_order=${sort.order ?? 'acs'}`;
    dispatch(fetchGuitarList(query));

  }, [dispatch]);

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
            <Filter />
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
