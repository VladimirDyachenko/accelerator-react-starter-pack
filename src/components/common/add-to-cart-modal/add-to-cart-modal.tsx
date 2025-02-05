import { memo } from 'react';
import { Guitar } from 'types/types';
import { formatPrice, GuitarTypeToLabelMap } from 'const/const';

type AddToCartModalProps = {
  onModalClose: () => void;
  onConfirmClick: () => void;
  product: Guitar;
}

function AddToCartModal({ onModalClose, onConfirmClick, product }: AddToCartModalProps) {

  return (
    <div className='modal__content' data-testid='add-to-cart-modal'>
      <h2 className='modal__header title title--medium'>Добавить товар в корзину</h2>
      <div className='modal__info'>
        <img className='modal__img' src={product.previewImg} width='67' height='137' alt={product.name} />
        <div className='modal__info-wrapper'>
          <h3 className='modal__product-name title title--little title--uppercase'>{product.name}</h3>
          <p className='modal__product-params modal__product-params--margin-11'>Артикул: {product.vendorCode}</p>
          <p className='modal__product-params'>{GuitarTypeToLabelMap[product.type]}, {product.stringCount} струнная</p>
          <p className='modal__price-wrapper'>
            <span className='modal__price'>Цена:</span>
            <span className='modal__price'>{formatPrice(product.price)} ₽</span>
          </p>
        </div>
      </div>
      <div className='modal__button-container'>
        <button
          className='button button--red button--big modal__button modal__button--add'
          onClick={onConfirmClick} data-testid='add-to-cart-modal-confirm'
        >
          Добавить в корзину
        </button>
      </div>
      <button
        className='modal__close-btn button-cross' type='button' aria-label='Закрыть'
        onClick={onModalClose} data-testid='add-to-cart-modal-close'
      >
        <span className='button-cross__icon'></span>
        <span className='modal__close-btn-interactive-area'></span>
      </button>
    </div>
  );
}

export default memo(AddToCartModal);
