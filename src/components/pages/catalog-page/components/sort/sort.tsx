import { SortOption } from 'types/types';

type SortProps = {
  currentOption: SortOption,
  onSetSort: (option: SortOption) => void,
}

function Sort({currentOption, onSetSort}: SortProps): JSX.Element {
  const isSortActive = (option: string):boolean => option === currentOption.sortProperty;
  const isOrderActive = (order: string):boolean => order === currentOption.order;

  return (
    <div className='catalog-sort'>
      <h2 className='catalog-sort__title'>Сортировать:</h2>
      <div className='catalog-sort__type'>
        <button
          className={`catalog-sort__type-button ${isSortActive('price') ? 'catalog-sort__type-button--active' : ''}`}
          aria-label='по цене'
          tabIndex={isSortActive('price') ? -1 : 0}
          onClick={() => onSetSort({...currentOption, sortProperty: 'price'})}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button ${isSortActive('rating') ? 'catalog-sort__type-button--active' : ''}`}
          aria-label='по популярности'
          tabIndex={isSortActive('rating') ? -1 : 0}
          onClick={() => onSetSort({...currentOption, sortProperty: 'rating'})}
        >
          по популярности
        </button>
      </div>
      <div className='catalog-sort__order'>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${isOrderActive('acs') ? 'catalog-sort__order-button--active' : ''}`}
          aria-label='По возрастанию'
          tabIndex={isOrderActive('acs') ? -1 : 0}
          onClick={() => onSetSort({...currentOption, order: 'acs'})}
        />
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${isOrderActive('desc') ? 'catalog-sort__order-button--active' : ''}`}
          aria-label='По убыванию'
          tabIndex={isOrderActive('desc') ? -1 : 0}
          onClick={() => onSetSort({...currentOption, order: 'desc'})}
        />
      </div>
    </div>
  );
}

export default Sort;
