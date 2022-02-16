import { Link } from 'react-router-dom';
import { Guitar } from 'types/types';
import { AppRoute, formatPrice } from 'const/const';
import { RateStars } from 'components/common/common';
import { MouseEvent } from 'react';

type ProductCardProps = {
  product: Guitar;
  onAddToCart: (product: Guitar) => void;
}

function ProductCard({product, onAddToCart}: ProductCardProps): JSX.Element {
  const handleAddToCartClick = (event: MouseEvent) => {
    event.preventDefault();
    onAddToCart(product);
  };

  return (
    <div className='product-card'>
      <img
        src={product.previewImg}
        width='75'
        height='190'
        alt={product.name}
        data-testid='product-image'
      />
      <div className='product-card__info'>
        <RateStars
          size={{width: 12, height: 11}}
          rating={product.rating}
          rateCount={product.comments.length}
          additionalContainerClassName='product-card__rate'
        />

        <p className='product-card__title' data-testid='product-name'>{product.name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>{formatPrice(product.price)} ₽
        </p>
      </div>
      <div className='product-card__buttons'>
        <Link
          className='button button--mini'
          to={`${AppRoute.Product}/${product.id}`}
          data-testid='details-link'
        >
          Подробнее
        </Link>
        <a
          className='button button--red button--mini button--add-to-cart'
          href='#todo'
          title='Добавить в корзину'
          onClick={handleAddToCartClick}
          data-testid='add-to-cart'
        >
          Купить
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
