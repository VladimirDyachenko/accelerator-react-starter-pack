import { memo } from 'react';
import { Guitar } from 'types/types';
import { Tabs } from '../components';

type ProductCardProps = {
  product: Guitar;
}

function ProductCard({ product }: ProductCardProps): JSX.Element {
  return (
    <div className='product-container'>
      <img
        className='product-container__img'
        src={product.previewImg}
        width='90'
        height='235'
        alt={product.name}
      />
      <div className='product-container__info-wrapper'>
        <h2 className='product-container__title title title--big title--uppercase'>
          {product.name}
        </h2>
        <div
          className='rate product-container__rating'
          aria-hidden='true'
        >
          {/* TODO вынести в отдельный компонент */}
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
          <span className='rate__count'>{product.comments.length}</span>
          <span className='rate__message'></span>
        </div>

        <Tabs product={product}/>

      </div>

      <div className='product-container__price-wrapper'>
        <p className='product-container__price-info product-container__price-info--title'>
          Цена:
        </p>
        <p className='product-container__price-info product-container__price-info--value'>
          {product.price.toLocaleString('ru-RU', {minimumFractionDigits: 0, maximumFractionDigits: 2})} ₽
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
