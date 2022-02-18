import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsAmount, getCoupon, getDiscountAmount, getIsNeedFetchProductsData, getItemsInCart, getProductsData, getTotalPrice } from 'store/cart-process/selectors';
import { CouponForm, ModalContainer, Spinner } from 'components/common/common';
import { CartItem, CartTotal, RemoveCartItemModal } from '../components';
import { AppRoute } from 'const/const';
import { Link } from 'react-router-dom';
import { fetchCartData } from 'store/api-actions';
import { setProductCount } from 'store/cart-process/actions';
import { Guitar } from 'types/types';

function Cart() {
  const dispatch = useDispatch();
  const itemsInCartList = useSelector(getItemsInCart);
  const cartItemsAmount = useSelector(getCartItemsAmount);
  const isNeedFetchProductData = useSelector(getIsNeedFetchProductsData);
  const productsData = useSelector(getProductsData);
  const [modalName, setModalName] = useState<'confirm-delete'>();
  const [confirmModalData, setConfirmModalData] = useState<Guitar>();
  const totalPrice = useSelector(getTotalPrice);
  const discount = useSelector(getDiscountAmount);
  const currentCoupon = useSelector(getCoupon);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const onModalClose = useCallback(() => {
    setModalName(undefined);
    setConfirmModalData(undefined);
  }, []);

  const onConfirmClick = useCallback(() => {
    if (confirmModalData) {
      dispatch(setProductCount(confirmModalData.id, 0));
    }
    onModalClose();
  }, [dispatch, onModalClose, confirmModalData]);

  const openConfirmModal = useCallback((productId: number) => {
    setConfirmModalData(productsData[productId]);
    setModalName('confirm-delete');
  }, [productsData]);

  const onAmountUpdate = useCallback((id: number, amount: number) => {
    if (amount === 0) {
      openConfirmModal(id);
      return;
    }
    dispatch(setProductCount(id, amount));
  }, [dispatch, openConfirmModal]);

  useEffect(() => {
    if (isNeedFetchProductData) {
      const idsToLoad = itemsInCartList.map((item) => item.id);
      const onSuccess = () => setIsLoadingError(false);
      const onError = () => setIsLoadingError(true);
      dispatch(fetchCartData(idsToLoad, onSuccess, onError));
    }
  }, [dispatch, isNeedFetchProductData, itemsInCartList]);

  if (isLoadingError) {
    return (
      <div className='cart'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p>Ошибка загрузки</p>
      </div>
    );
  }

  if (isNeedFetchProductData) {
    return (
      <div className='cart'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Spinner/>
      </div>
    );
  }

  if (cartItemsAmount < 1) {
    return (
      <div className='cart'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p>В корзине еще ничего нет</p>
        <Link
          style={{width: 'fit-content'}}
          className='button button--red button--big'
          to={AppRoute.Catalog}
        >
          Купим что-нибудь?
        </Link>
      </div>
    );
  }

  return (
    <div className='cart'>

      {itemsInCartList.map((item) => (
        <CartItem
          key={item.id}
          amount={item.amount}
          productData={productsData[item.id]}
          onAmountUpdate={onAmountUpdate}
        />))}

      <div className='cart__footer'>
        <CouponForm containerClassName='cart__coupon' currentCoupon={currentCoupon}/>
        <CartTotal total={totalPrice} discount={discount} />
      </div>

      <ModalContainer modalName={modalName} onModalClose={onModalClose}>
        {modalName === 'confirm-delete' && confirmModalData !== undefined &&
          <RemoveCartItemModal productData={confirmModalData} onConfirmClick={onConfirmClick} onModalClose={onModalClose} />}
      </ModalContainer>
    </div>
  );
}

export default memo(Cart);
