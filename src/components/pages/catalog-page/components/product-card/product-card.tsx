import { AppRoute } from 'const/const';
import { Link } from 'react-router-dom';
import { Guitar } from 'types/types';

type ProductCardProps = {
  product: Guitar;
}

function ProductCard({product}: ProductCardProps): JSX.Element {
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
        <div className='rate product-card__rate' aria-hidden='true'>
          <span className='visually-hidden'>Рейтинг:</span>
          <svg width='12' height='11' aria-hidden='true'>
            <use xlinkHref={product.rating >= 1 ? '#icon-full-star' : '#icon-star'} />
          </svg>
          <svg width='12' height='11' aria-hidden='true'>
            <use xlinkHref={product.rating >= 2 ? '#icon-full-star' : '#icon-star'} />
          </svg>
          <svg width='12' height='11' aria-hidden='true'>
            <use xlinkHref={product.rating >= 3 ? '#icon-full-star' : '#icon-star'} />
          </svg>
          <svg width='12' height='11' aria-hidden='true'>
            <use xlinkHref={product.rating >= 4 ? '#icon-full-star' : '#icon-star'} />
          </svg>
          <svg width='12' height='11' aria-hidden='true'>
            <use xlinkHref={product.rating >= 5 ? '#icon-full-star' : '#icon-star'} />
          </svg>
          <span className='rate__count' data-testid='comments-count'>{product.comments.length}</span>
          <span className='rate__message'></span>
        </div>
        <p className='product-card__title' data-testid='product-name'>{product.name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>{product.price} ₽
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
        >
          Купить
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
