import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SortOption } from 'types/types';

type SortProps = {
  onSortChange: (sort: SortOption) => void;
}

function Sort({onSortChange}: SortProps): JSX.Element {
  const history = useHistory();
  const [selectedSort, setSelectedSort] = useState<SortOption>(() => getInitialSortState(history.location.search));

  function getInitialSortState(queryParams: string): SortOption {
    const params = new URLSearchParams(queryParams);

    let sortProperty = params.get('_sort') ?? undefined;

    if (sortProperty !== 'price' && sortProperty !== 'rating') {
      sortProperty = undefined;
    }

    let order = params.get('_order') ?? undefined;
    if (order !== 'acs' && order !== 'desc') {
      order = undefined;
    }

    return { order, sortProperty};
  }


  const isSortActive = (option: string):boolean => option === selectedSort.sortProperty;
  const isOrderActive = (order: string):boolean => order === selectedSort.order;

  const handleSortChange = ({sortProperty, order}: SortOption) => {
    if (order === undefined) {
      order = 'acs';
    }

    if (sortProperty === undefined) {
      sortProperty = 'price';
    }

    setSelectedSort({sortProperty, order});
  };

  useEffect(() => {
    if (selectedSort.order !== undefined || selectedSort.sortProperty !== undefined) {
      onSortChange(selectedSort);
    }

  }, [selectedSort, onSortChange]);

  return (
    <div className='catalog-sort'>
      <h2 className='catalog-sort__title'>Сортировать:</h2>
      <div className='catalog-sort__type'>
        <button
          className={`catalog-sort__type-button ${isSortActive('price') ? 'catalog-sort__type-button--active' : ''}`}
          aria-label='по цене'
          tabIndex={isSortActive('price') ? -1 : 0}
          onClick={() => handleSortChange({...selectedSort, sortProperty: 'price'})}
          data-testid='sort-by-price'
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button ${isSortActive('rating') ? 'catalog-sort__type-button--active' : ''}`}
          aria-label='по популярности'
          tabIndex={isSortActive('rating') ? -1 : 0}
          onClick={() => handleSortChange({...selectedSort, sortProperty: 'rating'})}
          data-testid='sort-by-rating'
        >
          по популярности
        </button>
      </div>
      <div className='catalog-sort__order'>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${isOrderActive('acs') ? 'catalog-sort__order-button--active' : ''}`}
          aria-label='По возрастанию'
          tabIndex={isOrderActive('acs') ? -1 : 0}
          onClick={() => handleSortChange({...selectedSort, order: 'acs'})}
          data-testid='sort-order-acs'
        />
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${isOrderActive('desc') ? 'catalog-sort__order-button--active' : ''}`}
          aria-label='По убыванию'
          tabIndex={isOrderActive('desc') ? -1 : 0}
          onClick={() => handleSortChange({...selectedSort, order: 'desc'})}
          data-testid='sort-order-desc'
        />
      </div>
    </div>
  );
}

export default Sort;
