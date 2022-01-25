import { memo } from 'react';
import { Guitar } from 'types/types';
import { RateStars } from 'components/common/common';
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

        <RateStars
          size={{width: 14, height: 14}}
          rating={product.rating}
          rateCount={product.comments.length}
          additionalContainerClassName='product-container__rating'
        />

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
