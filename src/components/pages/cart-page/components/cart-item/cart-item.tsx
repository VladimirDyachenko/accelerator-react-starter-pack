import { GuitarTypeToLabelMap } from 'const/const';
import { memo, useMemo } from 'react';
import { Guitar } from 'types/types';

type CartItemProps = {
  productData: Guitar;
  amount: number;
}

function CartItem({productData, amount}: CartItemProps): JSX.Element {
  const totalPrice = useMemo(() => productData.price * amount, [productData, amount]);

  return (
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
          src={productData.previewImg}
          width='55'
          height='130'
          alt={productData.name}
        />
      </div>
      <div className='product-info cart-item__info'>
        <p className='product-info__title'>{productData.name}</p>
        <p className='product-info__info'>Артикул: {productData.vendorCode}</p>
        <p className='product-info__info'>{GuitarTypeToLabelMap[productData.type]}, {productData.stringCount} струнная</p>
      </div>
      <div className='cart-item__price'>{productData.price.toLocaleString('ru-RU', {minimumFractionDigits: 0, maximumFractionDigits: 2})} ₽</div>
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
          value={amount}
          readOnly
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
      <div className='cart-item__price-total'>{totalPrice.toLocaleString('ru-RU', {minimumFractionDigits: 0, maximumFractionDigits: 2})} ₽</div>
    </div>
  );
}

export default memo(CartItem);
