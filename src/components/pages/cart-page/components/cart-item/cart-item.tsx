import { formatPrice, GuitarTypeToLabelMap } from 'const/const';
import { ChangeEvent, memo, useMemo } from 'react';
import { Guitar } from 'types/types';

type CartItemProps = {
  productData: Guitar;
  amount: number;
  onAmountUpdate: (id: number, amount: number) => void;
}

function CartItem({ productData, amount, onAmountUpdate }: CartItemProps): JSX.Element {
  const totalPrice = useMemo(() => productData.price * amount, [productData, amount]);
  const handleDeleteClick = () => onAmountUpdate(productData.id, 0);
  const handleIncrementClick = () => {
    if (amount + 1 < 100) {
      onAmountUpdate(productData.id, amount + 1);
    }
  };
  const handleDecrementClick = () => onAmountUpdate(productData.id, amount - 1);
  const handleAmountInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(parseInt(event.target.value, 10) ?? 0, 99);
    if (!isNaN(newValue) && newValue !== amount) {
      onAmountUpdate(productData.id, newValue);
    }
  };

  return (
    <div className='cart-item'>
      <button
        className='cart-item__close-button button-cross'
        type='button'
        aria-label='Удалить'
        onClick={handleDeleteClick}
        data-testid='cart-item-delete-button'
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
        <p className='product-info__title' data-testid='cart-item-name'>{productData.name}</p>
        <p className='product-info__info' data-testid='cart-item-vendor-code'>Артикул: {productData.vendorCode}</p>
        <p className='product-info__info'>{GuitarTypeToLabelMap[productData.type]}, {productData.stringCount} струнная</p>
      </div>
      <div className='cart-item__price' data-testid='cart-item-price'>{formatPrice(productData.price)} ₽</div>
      <div className='quantity cart-item__quantity'>
        <button
          className='quantity__button'
          aria-label='Уменьшить количество'
          onClick={handleDecrementClick}
          data-testid='cart-item-decrement'
        >
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-minus'></use>
          </svg>
        </button>
        <input
          className='quantity__input'
          type='number'
          placeholder='1'
          id={`${productData.id}-count`}
          name={`${productData.id}-count`}
          max='99'
          value={amount}
          onChange={handleAmountInput}
          data-testid='cart-item-input'
        />
        <button
          className='quantity__button'
          aria-label='Увеличить количество'
          onClick={handleIncrementClick}
          data-testid='cart-item-increment'
        >
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-plus'></use>
          </svg>
        </button>
      </div>
      <div className='cart-item__price-total' data-testid='cart-item-total-price'>{formatPrice(totalPrice)} ₽</div>
    </div>
  );
}

export default memo(CartItem);
