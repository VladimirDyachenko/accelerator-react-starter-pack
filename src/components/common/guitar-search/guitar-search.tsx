import { AppRoute } from 'const/const';
import { useGuitarSearch,  useClickOutside} from 'hooks/hooks';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

function GuitarSearch(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [results] = useGuitarSearch(searchTerm);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const onClickOutside =() => {
    setIsOpen(false);
  };
  useClickOutside(searchRef, onClickOutside);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.trim());
  };

  useEffect(() => {
    if (results.data.length > 0 || results.error !== null) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [results.data.length, results.error, searchTerm]);

  const handleGuitarClick = (id: number) => {
    setIsOpen(false);
    history.push(`${AppRoute.Product}/${id}`);
  };

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
          onFocus={() =>  results.data.length > 0 && setIsOpen(true)}
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
        {results.error === null && results.data.map((item) => (
          <li key={item.id} className='form-search__select-item' tabIndex={0} onClick={() => handleGuitarClick(item.id)}>
            {item.name}
          </li>
        ))}

        {results.error &&
        <li className='form-search__select-item' tabIndex={0}>
          <span>Не удалось загрузить результаты</span>
        </li>}
      </ul>
    </div>
  );
}

export default GuitarSearch;
