import { createSelector } from 'reselect';
import { NameSpace } from 'store/root-reducer';
import { Guitar, State } from 'types/types';

export const getItemsInCart = (state: State): Array<{id: number, amount: number}> => state[NameSpace.Cart].itemsInCartList;

export const getProductsData = (state: State): { [id: number]: Guitar } => state[NameSpace.Cart].productsData;

export const getCartItemsAmount = createSelector(
  getItemsInCart,
  (products) => products.reduce((acc, product) => acc += product.amount, 0),
);

export const getIsNeedFetchProductsData = createSelector(
  getProductsData,
  getItemsInCart,
  (productData, itemsInCart):boolean => {
    if (itemsInCart.length === 0) {
      return false;
    }

    return !itemsInCart.every((item) => productData[item.id] !== undefined);
  },
);

export const getProductIdsInCart = createSelector(
  getItemsInCart,
  (products) => products.reduce((acc: {[key: number]: boolean}, product) => {
    acc[product.id] = true;
    return acc;
  }, {}),
);

export const getDiscountPercent = (state: State): number => state[NameSpace.Cart].discount;

export const getTotalPrice = createSelector(
  getProductsData,
  getItemsInCart,
  (productData, itemsInCart):number => {
    let totalPrice = 0;
    if (itemsInCart.length === 0) {
      return totalPrice;
    }

    for (const product of itemsInCart) {
      if (productData[product.id]) {
        const price = productData[product.id].price;
        totalPrice += price * product.amount;
      }
    }

    return totalPrice;
  },
);

export const getDiscountAmount = createSelector(
  getTotalPrice,
  getDiscountPercent,
  (price, discount): number => {
    if (discount === 0) {
      return discount;
    }

    return price / 100 * discount;
  },
);

export const getCoupon = (state: State): string | null=> state[NameSpace.Cart].coupon;
