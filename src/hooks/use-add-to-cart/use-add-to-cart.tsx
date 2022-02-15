import { AddToCartModal, AddToCartSuccessModal, ModalContainer } from 'components/common/common';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from 'store/cart-process/actions';
import { Guitar } from 'types/types';

type useAddToCartReturn = {
  onModalClose: () => void;
  onAddToCart: (product: Guitar) => void;
  modal: JSX.Element;
}

function useAddToCart(): useAddToCartReturn {
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState<'confirm' | 'success'>();
  const [addToCartProduct, setAddToCartProduct] = useState<Guitar>();
  const onModalClose = useCallback(() => {
    setActiveModal(undefined);
    setAddToCartProduct(undefined);
  }, []);
  const onAddToCart = useCallback((product: Guitar) => {
    setAddToCartProduct(product);
    setActiveModal('confirm');
  }, []);
  const onConfirmClick = useCallback(() => {
    if (addToCartProduct !== undefined) {
      dispatch(addProduct(addToCartProduct.id, 1));
    }
    setActiveModal('success');
  }, [dispatch, addToCartProduct]);

  const modal = (
    <ModalContainer
      modalName={activeModal}
      onModalClose={onModalClose}
      wrapperClassName={activeModal === 'success' ? 'modal--success' : undefined}
    >
      {activeModal === 'confirm' && addToCartProduct !== undefined &&
    <AddToCartModal
      onModalClose={onModalClose}
      onConfirmClick={onConfirmClick}
      product={addToCartProduct}
    />}

      {activeModal === 'success' && <AddToCartSuccessModal onModalClose={onModalClose}/>}
    </ModalContainer>
  );

  return {
    onModalClose: onModalClose,
    onAddToCart: onAddToCart,
    modal: modal,
  };
}

export default useAddToCart;
