import { memo, useEffect, useMemo, useRef, KeyboardEvent } from 'react';
import { formatPrice, GuitarTypeToLabelMap, MAX_AMOUNT_IN_CART } from 'const/const';
import { Guitar } from 'types/types';

type CartItemProps = {
  productData: Guitar;
  amount: number;
  onAmountUpdate: (id: number, amount: number) => void;
}

function CartItem({ productData, amount, onAmountUpdate }: CartItemProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const totalPrice = useMemo(() => productData.price * amount, [productData, amount]);
  const handleDeleteClick = () => onAmountUpdate(productData.id, 0);
  const handleIncrementClick = () => {
    if (amount + 1 <= MAX_AMOUNT_IN_CART) {
      onAmountUpdate(productData.id, amount + 1);
    }
  };
  const handleDecrementClick = () => onAmountUpdate(productData.id, amount - 1);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.value = amount.toString();
    }
  }, [amount]);

  const updateAmount = () => {
    if (inputRef.current === null) {
      return;
    }
    let value = parseInt(inputRef.current.value, 10);

    if (isNaN(value)) {
      inputRef.current.value = amount.toString();
      return;
    }

    if (value > MAX_AMOUNT_IN_CART) {
      value = MAX_AMOUNT_IN_CART;
      inputRef.current.value = MAX_AMOUNT_IN_CART.toString();
    }

    if (value === amount) {
      return;
    }

    onAmountUpdate(productData.id, value);

    if (value < 1) {
      inputRef.current.value = amount.toString();
    }
  };

  const handleInputBlur = () => updateAmount();

  const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      updateAmount();
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
          max={MAX_AMOUNT_IN_CART}
          ref={inputRef}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
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
