import { memo, MouseEvent } from 'react';
import { Guitar } from 'types/types';
import { RateStars } from 'components/common/common';
import { Tabs } from '../components';
import useAddToCart from 'hooks/use-add-to-cart/use-add-to-cart';
import { formatPrice } from 'const/const';

type ProductCardProps = {
  product: Guitar;
}

function ProductCard({ product }: ProductCardProps): JSX.Element {

  const { onAddToCart, modal } = useAddToCart();
  const handleAddToCartClick = (event: MouseEvent) => {
    event.preventDefault();
    onAddToCart(product);
  };

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
        <h2
          className='product-container__title title title--big title--uppercase'
          data-testid='product-card-title'
        >
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
          {formatPrice(product.price)} ₽
        </p>
        <a
          className='button button--red button--big product-container__button'
          href='#temp'
          title='Добавить в корзину'
          onClick={handleAddToCartClick}
        >
          Добавить в корзину
        </a>
      </div>

      {modal}
    </div>
  );
}

export default memo(ProductCard);
