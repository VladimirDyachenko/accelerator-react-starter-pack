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
  const [activeModalName, setActiveModalName] = useState<'confirm' | 'success'>();
  const [addToCartProductData, setAddToCartProductData] = useState<Guitar>();
  const onModalClose = useCallback(() => {
    setActiveModalName(undefined);
    setAddToCartProductData(undefined);
  }, []);
  const onAddToCart = useCallback((product: Guitar) => {
    setAddToCartProductData(product);
    setActiveModalName('confirm');
  }, []);
  const onConfirmClick = useCallback(() => {
    if (addToCartProductData !== undefined) {
      dispatch(addProduct(addToCartProductData.id, 1));
    }
    setActiveModalName('success');
  }, [dispatch, addToCartProductData]);

  const modal = (
    <ModalContainer
      modalName={activeModalName}
      onModalClose={onModalClose}
      wrapperClassName={activeModalName === 'success' ? 'modal--success' : undefined}
    >
      {activeModalName === 'confirm' && addToCartProductData !== undefined &&
        <AddToCartModal
          onModalClose={onModalClose}
          onConfirmClick={onConfirmClick}
          product={addToCartProductData}
        />}

      {activeModalName === 'success' && <AddToCartSuccessModal onModalClose={onModalClose} />}
    </ModalContainer>
  );

  return {
    onModalClose: onModalClose,
    onAddToCart: onAddToCart,
    modal: modal,
  };
}

export default useAddToCart;
