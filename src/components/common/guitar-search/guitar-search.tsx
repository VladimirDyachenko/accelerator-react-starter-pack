import { useGuitarSearch,  useClickOutside} from 'hooks/hooks';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

function GuitarSearch(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [guitarsList] = useGuitarSearch(searchTerm);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const onClickOutside =() => {
    setIsOpen(false);
  };
  useClickOutside(searchRef, onClickOutside);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  useEffect(() => {
    if (guitarsList.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [guitarsList.length, searchTerm]);

  return (
    <div className='form-search' ref={searchRef}>
      <form className='form-search__form'>
        <button className='form-search__submit' type='submit'>
          <svg
            className='form-search__icon'
            width='14'
            height='15'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-search'></use>
          </svg>
          <span className='visually-hidden'>Начать поиск</span>
        </button>
        <input
          className='form-search__input'
          id='search'
          type='text'
          autoComplete='off'
          placeholder='что вы ищите?'
          onChange={onInputChange}
          onFocus={() =>  guitarsList.length > 0 && setIsOpen(true)}
          data-testid='guitar-search-input'
        />
        <label className='visually-hidden' htmlFor='search'>
          Поиск
        </label>
      </form>
      <ul
        //z-index исправляет баг
        //при котором лист оказывается под декоративными изображением гитары
        style={{'zIndex': '1'}}
        className={`form-search__select-list ${isOpen ? '' : 'hidden'}`}
        data-testid='search-ul'
      >
        {guitarsList.map((item) => (
          <li key={item.id} className='form-search__select-item' tabIndex={0}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuitarSearch;
