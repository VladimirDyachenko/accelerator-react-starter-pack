import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { AppRoute } from 'const/const';

export type AddToCartSuccessModalProps = {
  onModalClose: () => void;
};

function AddToCartSuccessModal({ onModalClose }: AddToCartSuccessModalProps): JSX.Element {
  const history = useHistory();
  const handleGoToCartClick = () => {
    history.push(AppRoute.Cart);
  };

  const handleContinueShoppingClick = () => {
    if (history.location.pathname.includes(AppRoute.Product)) {
      history.push(AppRoute.Catalog);
      return;
    }
    onModalClose();
  };

  return (
    <div className='modal__content' data-testid='add-success-modal'>
      <svg className='modal__icon' width='26' height='20' aria-hidden='true'>
        <use xlinkHref='#icon-success'></use>
      </svg>
      <p className='modal__message'>Товар успешно добавлен в корзину</p>
      <div className='modal__button-container modal__button-container--add'>
        <button
          className='button button--small modal__button'
          onClick={handleGoToCartClick}
          data-testid='success-modal-to-cart'
        >
          Перейти в корзину
        </button>
        <button
          className='button button--black-border button--small modal__button modal__button--right'
          onClick={handleContinueShoppingClick}
          data-testid='success-modal-to-continue'
        >
          Продолжить покупки
        </button>
      </div>
      <button
        className='modal__close-btn button-cross' type='button' aria-label='Закрыть'
        onClick={onModalClose}
      >
        <span className='button-cross__icon'></span>
        <span className='modal__close-btn-interactive-area' data-testid='add-success-close'></span>
      </button>
    </div>
  );
}

export default memo(AddToCartSuccessModal);
