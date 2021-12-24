function Sort(): JSX.Element {
  return (
    <div className='catalog-sort'>
      <h2 className='catalog-sort__title'>Сортировать:</h2>
      <div className='catalog-sort__type'>
        <button
          className='catalog-sort__type-button catalog-sort__type-button--active'
          aria-label='по цене'
          tabIndex={1}
        >
        по цене
        </button>
        <button
          className='catalog-sort__type-button'
          aria-label='по популярности'
        >
        по популярности
        </button>
      </div>
      <div className='catalog-sort__order'>
        <button
          className='catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active'
          aria-label='По возрастанию'
          tabIndex={1}
        />
        <button
          className='catalog-sort__order-button catalog-sort__order-button--down'
          aria-label='По убыванию'
        />
      </div>
    </div>
  );
}

export default Sort;
