function ProductPage(): JSX.Element {

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
                <a className='link main-nav__link' href='#temp'>
                  Каталог
                </a>
              </li>
              <li>
                <a className='link main-nav__link' href='#temp'>
                  Где купить?
                </a>
              </li>
              <li>
                <a className='link main-nav__link' href='#temp'>
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
          <a className='header__cart-link' href='#temp' aria-label='Корзина'>
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
          <h1 className='page-content__title title title--bigger'>Товар</h1>
          <ul className='breadcrumbs page-content__breadcrumbs'>
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
              <a className='link' href='#temp'>Товар</a>
            </li>
          </ul>
          <div className='product-container'>
            <img
              className='product-container__img'
              src='img/guitar-2.jpg'
              width='90'
              height='235'
              alt=''
            />
            <div className='product-container__info-wrapper'>
              <h2 className='product-container__title title title--big title--uppercase'>
                СURT Z30 Plus
              </h2>
              <div
                className='rate product-container__rating'
                aria-hidden='true'
              >
                <span className='visually-hidden'>Рейтинг:</span>
                <svg width='14' height='14' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='14' height='14' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='14' height='14' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='14' height='14' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='14' height='14' aria-hidden='true'>
                  <use xlinkHref='#icon-star'></use>
                </svg>
                <span className='rate__count'></span>
                <span className='rate__message'></span>
              </div>
              <div className='tabs'>
                <a
                  className='button button--medium tabs__button'
                  href='#characteristics'
                >
                  Характеристики
                </a>
                <a
                  className='button button--black-border button--medium tabs__button'
                  href='#description'
                >
                  Описание
                </a>
                <div className='tabs__content' id='characteristics'>
                  <table className='tabs__table'>
                    <tbody>
                      <tr className='tabs__table-row'>
                        <td className='tabs__title'>Артикул:</td>
                        <td className='tabs__value'>SO754565</td>
                      </tr>
                      <tr className='tabs__table-row'>
                        <td className='tabs__title'>Тип:</td>
                        <td className='tabs__value'>Электрогитара</td>
                      </tr>
                      <tr className='tabs__table-row'>
                        <td className='tabs__title'>Количество струн:</td>
                        <td className='tabs__value'>6 струнная</td>
                      </tr>

                    </tbody>
                  </table>
                  <p className='tabs__product-description hidden'>
                    Гитара подходит как для старта обучения, так и для домашних
                    занятий или использования в полевых условиях, например, в
                    походах или для проведения уличных выступлений. Доступная
                    стоимость, качество и надежная конструкция, а также приятный
                    внешний вид, который сделает вас звездой вечеринки.
                  </p>
                </div>
              </div>
            </div>
            <div className='product-container__price-wrapper'>
              <p className='product-container__price-info product-container__price-info--title'>
                Цена:
              </p>
              <p className='product-container__price-info product-container__price-info--value'>
                52 000 ₽
              </p>
              <a
                className='button button--red button--big product-container__button'
                href='#temp'
              >
                Добавить в корзину
              </a>
            </div>
          </div>
          <section className='reviews'>
            <h3 className='reviews__title title title--bigger'>Отзывы</h3>
            <a
              className='button button--red-border button--big reviews__sumbit-button'
              href='#temp'
            >
              Оставить отзыв
            </a>
            <div className='review'>
              <div className='review__wrapper'>
                <h4 className='review__title review__title--author title title--lesser'>
                  Иванов Максим
                </h4>
                <span className='review__date'>12 декабря</span>
              </div>
              <div className='rate review__rating-panel' aria-hidden='true'>
                <span className='visually-hidden'>Рейтинг:</span>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-star'></use>
                </svg>
                <span className='rate__count'></span>
                <span className='rate__message'></span>
              </div>
              <h4 className='review__title title title--lesser'>
                Достоинства:
              </h4>
              <p className='review__value'>
                Хороший корпус, чистый звук, стурны хорошего качества
              </p>
              <h4 className='review__title title title--lesser'>Недостатки:</h4>
              <p className='review__value'>Тугие колонки</p>
              <h4 className='review__title title title--lesser'>
                Комментарий:
              </h4>
              <p className='review__value'>
                У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте
                неть чехла и ремня.
              </p>
            </div>
            <div className='review'>
              <div className='review__wrapper'>
                <h4 className='review__title review__title--author title title--lesser'>
                  Перова Ольга
                </h4>
                <span className='review__date'>12 декабря</span>
              </div>
              <div className='rate review__rating-panel' aria-hidden='true'>
                <span className='visually-hidden'>Рейтинг:</span>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-star'></use>
                </svg>
                <span className='rate__count'></span>
                <span className='rate__message'></span>
              </div>
              <h4 className='review__title title title--lesser'>
                Достоинства:
              </h4>
              <p className='review__value'>
                Хороший корпус, чистый звук, стурны хорошего качества
              </p>
              <h4 className='review__title title title--lesser'>Недостатки:</h4>
              <p className='review__value'>Тугие колонки</p>
              <h4 className='review__title title title--lesser'>
                Комментарий:
              </h4>
              <p className='review__value'>
                У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте
                неть чехла и ремня.{' '}
              </p>
            </div>
            <div className='review'>
              <div className='review__wrapper'>
                <h4 className='review__title review__title--author title title--lesser'>
                  Преображенская Ксения
                </h4>
                <span className='review__date'>12 декабря</span>
              </div>
              <div className='rate review__rating-panel' aria-hidden='true'>
                <span className='visually-hidden'>Рейтинг:</span>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-full-star'></use>
                </svg>
                <svg width='16' height='16' aria-hidden='true'>
                  <use xlinkHref='#icon-star'></use>
                </svg>
                <span className='rate__count'></span>
                <span className='rate__message'></span>
              </div>
              <h4 className='review__title title title--lesser'>
                Достоинства:
              </h4>
              <p className='review__value'>
                Хороший корпус, чистый звук, стурны хорошего качества
              </p>
              <h4 className='review__title title title--lesser'>Недостатки:</h4>
              <p className='review__value'>Тугие колонки</p>
              <h4 className='review__title title title--lesser'>
                Комментарий:
              </h4>
              <p className='review__value'>
                У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте
                неть чехла и ремня. У гитары отличный цвет, хороше дерево.
                Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный
                цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У
                гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть
                чехла и ремня.{' '}
              </p>
            </div>
            <button className='button button--medium reviews__more-button'>
              Показать еще отзывы
            </button>
            <a
              className='button button--up button--red-border button--big reviews__up-button'
              href='#header'
            >
              Наверх
            </a>
          </section>
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

export default ProductPage;
