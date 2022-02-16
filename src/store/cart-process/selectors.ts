import { createSelector } from 'reselect';
import { NameSpace } from 'store/root-reducer';
import { Guitar, State } from 'types/types';

export const getItemsInCart = (state: State): Array<{id: number, amount: number}> => state[NameSpace.Cart].inCart;

export const getProductData = (state: State): { [id: number]: Guitar } => state[NameSpace.Cart].productData;

export const getCartItemsAmount = createSelector(
  getItemsInCart,
  (products) => products.reduce((acc, product) => acc += product.amount, 0),
);

export const getIsNeedFetchProductData = createSelector(
  getProductData,
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

export const getDiscount =  (state: State): number => state[NameSpace.Cart].discount;

export const getTotalPrice = createSelector(
  getProductData,
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
