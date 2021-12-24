function CartPage(): JSX.Element {

  return (
    <div className='wrapper'>
      <header className='header' id='header'>
        <div className='container header__wrapper'>
          <a className='header__logo logo' href='main.html'>
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
                <a className='link main-nav__link' href='#todo'>
                  Каталог
                </a>
              </li>
              <li>
                <a className='link main-nav__link' href='#todo'>
                  Где купить?
                </a>
              </li>
              <li>
                <a className='link main-nav__link' href='#todo'>
                  О компании
                </a>
              </li>
            </ul>
          </nav>
          <div className='form-search'>
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
              />
              <label className='visually-hidden' htmlFor='search'>
                Поиск
              </label>
            </form>
            <ul className='form-search__select-list hidden'>
              <li className='form-search__select-item' tabIndex={0}>
                Четстер Plus
              </li>
              <li className='form-search__select-item' tabIndex={0}>
                Четстер UX
              </li>
              <li className='form-search__select-item' tabIndex={0}>
                Четстер UX2
              </li>
              <li className='form-search__select-item' tabIndex={0}>
                Четстер UX3
              </li>
              <li className='form-search__select-item' tabIndex={0}>
                Четстер UX4
              </li>
              <li className='form-search__select-item' tabIndex={0}>
                Четстер UX5
              </li>
            </ul>
          </div>
          <a className='header__cart-link' href='#todo' aria-label='Корзина'>
            <svg
              className='header__cart-icon'
              width='14'
              height='14'
              aria-hidden='true'
            >
              <use xlinkHref='#icon-basket'></use>
            </svg>
            <span className='visually-hidden'>Перейти в корзину</span>
            <span className='header__cart-count'>2</span>
          </a>
        </div>
      </header>
      <main className='page-content'>
        <div className='container'>
          <h1 className='title title--bigger page-content__title'>Корзина</h1>
          <ul className='breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page'>
            <li className='breadcrumbs__item'>
              <a className='link' href='./main.html'>
                Главная
              </a>
            </li>
            <li className='breadcrumbs__item'>
              <a className='link' href='./main.html'>
                Каталог
              </a>
            </li>
            <li className='breadcrumbs__item'>
              <a className='link' href='#todo'>Корзина</a>
            </li>
          </ul>
          <div className='cart'>
            <div className='cart-item'>
              <button
                className='cart-item__close-button button-cross'
                type='button'
                aria-label='Удалить'
              >
                <span className='button-cross__icon'></span>
                <span className='cart-item__close-button-interactive-area'></span>
              </button>
              <div className='cart-item__image'>
                <img
                  src='img/content/guitar-2.jpg'
                  width='55'
                  height='130'
                  alt='ЭлектроГитара Честер bass'
                />
              </div>
              <div className='product-info cart-item__info'>
                <p className='product-info__title'>ЭлектроГитара Честер bass</p>
                <p className='product-info__info'>Артикул: SO757575</p>
                <p className='product-info__info'>Электрогитара, 6 струнная</p>
              </div>
              <div className='cart-item__price'>17 500 ₽</div>
              <div className='quantity cart-item__quantity'>
                <button
                  className='quantity__button'
                  aria-label='Уменьшить количество'
                >
                  <svg width='8' height='8' aria-hidden='true'>
                    <use xlinkHref='#icon-minus'></use>
                  </svg>
                </button>
                <input
                  className='quantity__input'
                  type='number'
                  placeholder='1'
                  id='2-count'
                  name='2-count'
                  max='99'
                />
                <button
                  className='quantity__button'
                  aria-label='Увеличить количество'
                >
                  <svg width='8' height='8' aria-hidden='true'>
                    <use xlinkHref='#icon-plus'></use>
                  </svg>
                </button>
              </div>
              <div className='cart-item__price-total'>17 500 ₽</div>
            </div>
            <div className='cart-item'>
              <button
                className='cart-item__close-button button-cross'
                type='button'
                aria-label='Удалить'
              >
                <span className='button-cross__icon'></span>
                <span className='cart-item__close-button-interactive-area'></span>
              </button>
              <div className='cart-item__image'>
                <img
                  src='img/content/guitar-4.jpg'
                  width='55'
                  height='130'
                  alt='СURT Z30 Plus'
                />
              </div>
              <div className='product-info cart-item__info'>
                <p className='product-info__title'>СURT Z30 Plus</p>
                <p className='product-info__info'>Артикул: SO754565</p>
                <p className='product-info__info'>Электрогитара, 6 струнная</p>
              </div>
              <div className='cart-item__price'>34 500 ₽</div>
              <div className='quantity cart-item__quantity'>
                <button
                  className='quantity__button'
                  aria-label='Уменьшить количество'
                >
                  <svg width='8' height='8' aria-hidden='true'>
                    <use xlinkHref='#icon-minus'></use>
                  </svg>
                </button>
                <input
                  className='quantity__input'
                  type='number'
                  placeholder='1'
                  id='4-count'
                  name='4-count'
                  max='99'
                />
                <button
                  className='quantity__button'
                  aria-label='Увеличить количество'
                >
                  <svg width='8' height='8' aria-hidden='true'>
                    <use xlinkHref='#icon-plus'></use>
                  </svg>
                </button>
              </div>
              <div className='cart-item__price-total'>34 500 ₽</div>
            </div>
            <div className='cart__footer'>
              <div className='cart__coupon coupon'>
                <h2 className='title title--little coupon__title'>
                  Промокод на скидку
                </h2>
                <p className='coupon__info'>
                  Введите свой промокод, если он у вас есть.
                </p>
                <form
                  className='coupon__form'
                  id='coupon-form'
                  method='post'
                  action='/'
                >
                  <div className='form-input coupon__input'>
                    <label className='visually-hidden'>Промокод</label>
                    <input
                      type='text'
                      placeholder='Введите промокод'
                      id='coupon'
                      name='coupon'
                    />
                    <p className='form-input__message form-input__message--success'>
                      Промокод принят
                    </p>
                  </div>
                  <button className='button button--big coupon__button'>
                    Применить
                  </button>
                </form>
              </div>
              <div className='cart__total-info'>
                <p className='cart__total-item'>
                  <span className='cart__total-value-name'>Всего:</span>
                  <span className='cart__total-value'>52 000 ₽</span>
                </p>
                <p className='cart__total-item'>
                  <span className='cart__total-value-name'>Скидка:</span>
                  <span className='cart__total-value cart__total-value--bonus'>
                    - 3000 ₽
                  </span>
                </p>
                <p className='cart__total-item'>
                  <span className='cart__total-value-name'>К оплате:</span>
                  <span className='cart__total-value cart__total-value--payment'>
                    49 000 ₽
                  </span>
                </p>
                <button className='button button--red button--big cart__order-button'>
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className='footer'>
        <div className='footer__container container'>
          <a className='footer__logo logo' href='main.html'>
            <img
              className='logo__img'
              width='70'
              height='70'
              src='./img/svg/logo.svg'
              alt='Логотип'
            />
          </a>
          <div className='socials footer__socials'>
            <ul className='socials__list'>
              <li className='socials-item'>
                <a
                  className='socials__link'
                  href='https://www.facebook.com/'
                  aria-label='facebook'
                >
                  <svg
                    className='socials__icon'
                    width='24'
                    height='24'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-facebook'></use>
                  </svg>
                </a>
              </li>
              <li className='socials-item'>
                <a
                  className='socials__link'
                  href='https://www.instagram.com/'
                  aria-label='instagram'
                >
                  <svg
                    className='socials__icon'
                    width='24'
                    height='24'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-instagram'></use>
                  </svg>
                </a>
              </li>
              <li className='socials-item'>
                <a
                  className='socials__link'
                  href='https://www.twitter.com/'
                  aria-label='twitter'
                >
                  <svg
                    className='socials__icon'
                    width='24'
                    height='24'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-twitter'></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <section className='footer__nav-section footer__nav-section--info'>
            <h2 className='footer__nav-title'>О нас</h2>
            <p className='footer__nav-content footer__nav-content--font-secondary'>
              Магазин гитар, музыкальных инструментов и гитарная мастерская{' '}
              <br /> в Санкт-Петербурге.
              <br />
              <br />
              Все инструменты проверены, отстроены
              <br />
              и доведены до идеала!
            </p>
          </section>
          <section className='footer__nav-section footer__nav-section--links'>
            <h2 className='footer__nav-title'>Информация</h2>
            <ul className='footer__nav-list'>
              <li className='footer__nav-list-item'>
                <a className='link' href='#top'>
                  Где купить?
                </a>
              </li>
              <li className='footer__nav-list-item'>
                <a className='link' href='#top'>
                  Блог
                </a>
              </li>
              <li className='footer__nav-list-item'>
                <a className='link' href='#top'>
                  Вопрос - ответ
                </a>
              </li>
              <li className='footer__nav-list-item'>
                <a className='link' href='#top'>
                  Возврат
                </a>
              </li>
              <li className='footer__nav-list-item'>
                <a className='link' href='#top'>
                  Сервис-центры
                </a>
              </li>
            </ul>
          </section>
          <section className='footer__nav-section footer__nav-section--contacts'>
            <h2 className='footer__nav-title'>Контакты</h2>
            <p className='footer__nav-content'>
              г. Санкт-Петербург,
              <br /> м. Невский проспект, <br />
              ул. Казанская 6.
            </p>
            <div className='footer__nav-content'>
              <svg
                className='footer__icon'
                width='8'
                height='8'
                aria-hidden='true'
              >
                <use xlinkHref='#icon-phone'></use>
              </svg>
              <a className='link' href='tel:88125005050'>
                {' '}
                8-812-500-50-50
              </a>
            </div>
            <p className='footer__nav-content'>
              Режим работы:
              <br />
              <span className='footer__span'>
                <svg
                  className='footer__icon'
                  width='13'
                  height='13'
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-clock'></use>
                </svg>
                <span> с 11:00 до 20:00</span>
                <span>без выходных</span>
              </span>
            </p>
          </section>
        </div>
      </footer>
    </div>
  );
}

export default CartPage;
