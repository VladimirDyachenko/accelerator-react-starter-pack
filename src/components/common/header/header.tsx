import { AppRoute } from 'const/const';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getCartItemsAmount } from 'store/cart-process/selectors';
import { GuitarSearch } from '../common';

function Header(): JSX.Element {
  const cartItemsAmount = useSelector(getCartItemsAmount);

  return (
    <header className='header' id='header'>
      <div className='container header__wrapper'>
        <a className='header__logo logo' href='#todo'>
          <img
            className='logo__img'
            width='70'
            height='70'
            src='./img/svg/logo.svg'
            alt='Логотип'
          />
        </a>
        <nav className='main-nav'>
          <ul className='main-nav__list'>
            <li>
              <NavLink
                to={`${AppRoute.Catalog}/1`}
                className='link main-nav__link'
                activeClassName='link--current'
              >
                Каталог
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/page-404'}
                className='link main-nav__link'
                activeClassName='link--current'
              >
                Где купить?
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/page-404'}
                className='link main-nav__link'
                activeClassName='link--current'
              >
                О компании
              </NavLink>
            </li>
          </ul>
        </nav>

        <GuitarSearch />

        <Link className='header__cart-link' to={AppRoute.Cart} aria-label='Корзина'>
          <svg
            className='header__cart-icon'
            width='14'
            height='14'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-basket'></use>
          </svg>
          <span className='visually-hidden'>Перейти в корзину</span>
          {cartItemsAmount > 0 && <span className='header__cart-count'>{cartItemsAmount}</span>}
        </Link>
      </div>
    </header>

  );
}

export default Header;
