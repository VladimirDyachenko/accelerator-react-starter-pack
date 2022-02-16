import { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItemsAmount, getIsNeedFetchProductData, getItemsInCart, getProductData } from 'store/cart-process/selectors';
import { CouponForm, Spinner } from 'components/common/common';
import { CartItem, CartTotal } from '../components';
import { AppRoute } from 'const/const';
import { Link } from 'react-router-dom';
import { fetchCartData } from 'store/api-actions';
import { setProductCount } from 'store/cart-process/actions';

function Cart() {
  const dispatch = useDispatch();
  const itemsInCart = useSelector(getItemsInCart);
  const cartItemsAmount = useSelector(getCartItemsAmount);
  const isNeedFetchProductData = useSelector(getIsNeedFetchProductData);
  const productData = useSelector(getProductData);

  const onAmountUpdate = useCallback((id: number, amount: number) => {
    dispatch(setProductCount(id, amount));
  }, [dispatch]);

  useEffect(() => {
    if (isNeedFetchProductData) {
      const idsToLoad = itemsInCart.map((item) => item.id);
      dispatch(fetchCartData(idsToLoad));
    }
  },[dispatch, isNeedFetchProductData, itemsInCart]);

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

      {itemsInCart.map((item) => (
        <CartItem
          key={item.id}
          amount={item.amount}
          productData={productData[item.id]}
          onAmountUpdate={onAmountUpdate}
        />))}

      <div className='cart__footer'>
        <CouponForm containerClassName='cart__coupon'/>
        <CartTotal />
      </div>
    </div>
  );
}

export default memo(Cart);
