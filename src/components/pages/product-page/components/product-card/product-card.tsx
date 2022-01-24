import { memo } from 'react';
import { Tabs } from '../components';

function ProductCard(): JSX.Element {
  return (
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

        <Tabs />

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
  );
}

export default memo(ProductCard);
