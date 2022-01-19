import { UpdateFilterAction } from 'hooks/use-catalog-filter/use-catalog-filter';
import { useEffect, useState, KeyboardEvent, memo} from 'react';
import { GuitarType, IFilter } from 'types/types';

type FilterProps = {
  filterState: IFilter,
  onUpdateFilter: React.Dispatch<UpdateFilterAction>,
  minMaxPrice: { min: number, max: number },
};

function Filter(props: FilterProps): JSX.Element {
  const { filterState, onUpdateFilter, minMaxPrice } = props;
  const [minPrice, setMinPrice] = useState(filterState.minPrice);
  const [maxPrice, setMaxPrice] = useState(filterState.maxPrice);

  useEffect(() => setMinPrice(filterState.minPrice), [filterState.minPrice]);
  useEffect(() => setMaxPrice(filterState.maxPrice), [filterState.maxPrice]);

  const handleMinPriceBlur = () => {
    let payload = minPrice;
    const inputValue = parseInt(payload, 10);

    if (inputValue < minMaxPrice.min) {
      payload = minMaxPrice.min.toString();
      setMinPrice(payload);
    }

    if (inputValue > minMaxPrice.max) {
      payload = minMaxPrice.max.toString();
      setMinPrice(payload);
    }

    if (inputValue > parseInt(filterState.maxPrice, 10)) {
      payload = filterState.maxPrice;
      setMinPrice(payload);
    }

    onUpdateFilter({type: 'setMinPrice', payload});
  };

  const handleMaxPriceBlur = () => {
    let payload = maxPrice;
    const inputValue = parseInt(payload, 10);

    if (inputValue > minMaxPrice.max) {
      payload = minMaxPrice.max.toString();
      setMaxPrice(payload);
    }

    if (inputValue < minMaxPrice.min) {
      payload = minMaxPrice.min.toString();
      setMaxPrice(payload);
    }

    if (inputValue < parseInt(filterState.minPrice, 10)) {
      payload = filterState.minPrice;
      setMaxPrice(payload);
    }

    onUpdateFilter({type: 'setMaxPrice', payload});
  };

  const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>, cb: () => void) => {
    if (event.key === 'Enter') {
      cb();
    }
  };

  return (
    <form className='catalog-filter'>
      <h2 className='title title--bigger catalog-filter__title'>
        Фильтр
      </h2>
      <fieldset className='catalog-filter__block'>
        <legend className='catalog-filter__block-title'>Цена, ₽</legend>
        <div className='catalog-filter__price-range'>
          <div className='form-input'>
            <label className='visually-hidden'>Минимальная цена</label>
            <input
              type='number'
              placeholder={minMaxPrice.min.toString()}
              id='priceMin'
              name='от'
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              onBlur={handleMinPriceBlur}
              onKeyDown={(event) => handleEnterKeyDown(event, handleMinPriceBlur)}
              data-testid='filter-min-price'
            />
          </div>
          <div className='form-input'>
            <label className='visually-hidden'>Максимальная цена</label>
            <input
              type='number'
              placeholder={minMaxPrice.max.toString()}
              id='priceMax'
              name='до'
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              onBlur={handleMaxPriceBlur}
              onKeyDown={(event) => handleEnterKeyDown(event, handleMaxPriceBlur)}
              data-testid='filter-max-price'
            />
          </div>
        </div>
      </fieldset>
      <fieldset className='catalog-filter__block'>
        <legend className='catalog-filter__block-title'>Тип гитар</legend>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='acoustic'
            name='acoustic'
            checked={filterState.selectedGuitarsTypes[GuitarType.Acoustic]}
            onChange={() => onUpdateFilter({type: 'toggleGuitarType', payload: GuitarType.Acoustic})}
            data-testid='filter-type-acoustic'
          />
          <label htmlFor='acoustic'>Акустические гитары</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='electric'
            name='electric'
            checked={filterState.selectedGuitarsTypes[GuitarType.Electric]}
            onChange={() => onUpdateFilter({type: 'toggleGuitarType', payload: GuitarType.Electric})}
            data-testid='filter-type-electric'
          />
          <label htmlFor='electric'>Электрогитары</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='ukulele'
            name='ukulele'
            checked={filterState.selectedGuitarsTypes[GuitarType.Ukulele]}
            onChange={() => onUpdateFilter({type: 'toggleGuitarType', payload: GuitarType.Ukulele})}
            data-testid='filter-type-ukulele'
          />
          <label htmlFor='ukulele'>Укулеле</label>
        </div>
      </fieldset>
      <fieldset className='catalog-filter__block'>
        <legend className='catalog-filter__block-title'>
          Количество струн
        </legend>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='4-strings'
            name='4-strings'
            disabled={!filterState.getIsStringsCountValid(4)}
            checked={filterState.selectedStringsCounts[4]}
            onChange={() => onUpdateFilter({type: 'toggleStringCount', payload: 4})}
            data-testid='filter-string-four'
          />
          <label htmlFor='4-strings'>4</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='6-strings'
            name='6-strings'
            disabled={!filterState.getIsStringsCountValid(6)}
            checked={filterState.selectedStringsCounts[6]}
            onChange={() => onUpdateFilter({type: 'toggleStringCount', payload: 6})}
            data-testid='filter-string-six'
          />
          <label htmlFor='6-strings'>6</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='7-strings'
            name='7-strings'
            disabled={!filterState.getIsStringsCountValid(7)}
            checked={filterState.selectedStringsCounts[7]}
            onChange={() => onUpdateFilter({type: 'toggleStringCount', payload: 7})}
            data-testid='filter-string-seven'
          />
          <label htmlFor='7-strings'>7</label>
        </div>
        <div className='form-checkbox catalog-filter__block-item'>
          <input
            className='visually-hidden'
            type='checkbox'
            id='12-strings'
            name='12-strings'
            disabled={!filterState.getIsStringsCountValid(12)}
            checked={filterState.selectedStringsCounts[12]}
            onChange={() => onUpdateFilter({type: 'toggleStringCount', payload: 12})}
            data-testid='filter-string-twelve'
          />
          <label htmlFor='12-strings'>12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default memo(Filter);
