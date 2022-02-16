import { formatPrice, GuitarTypeToLabelMap } from 'const/const';
import { memo } from 'react';
import { Guitar } from 'types/types';

type RemoveCartItemModalProps = {
  productData: Guitar;
  onConfirmClick: () => void;
  onModalClose: () => void;
};

function RemoveCartItemModal({productData, onConfirmClick, onModalClose}: RemoveCartItemModalProps) {
  return (
    <div className='modal__content'>
      <h2 className='modal__header title title--medium title--red'>Удалить этот товар?</h2>
      <div className='modal__info'>
        <img className='modal__img' src={productData.previewImg} width='67' height='137' alt={productData.name} />
        <div className='modal__info-wrapper'>
          <h3 className='modal__product-name title title--little title--uppercase'>{productData.name}</h3>
          <p className='modal__product-params modal__product-params--margin-11'>Артикул: {productData.vendorCode}</p>
          <p className='modal__product-params'>{GuitarTypeToLabelMap[productData.type]}, {productData.stringCount} струнная</p>
          <p className='modal__price-wrapper'>
            <span className='modal__price'>Цена:</span>
            <span className='modal__price'>{formatPrice(productData.price)} ₽</span>
          </p>
        </div>
      </div>
      <div className='modal__button-container'>
        <button
          className='button button--small modal__button'
          onClick={onConfirmClick}
        >
          Удалить товар
        </button>
        <button
          className='button button--black-border button--small modal__button modal__button--right'
          onClick={onModalClose}
        >
          Продолжить покупки
        </button>
      </div>
      <button
        className='modal__close-btn button-cross' type='button' aria-label='Закрыть'
        onClick={onModalClose}
      >
        <span className='button-cross__icon'></span>
        <span className='modal__close-btn-interactive-area'></span>
      </button>
    </div>
  );
}

export default memo(RemoveCartItemModal);
