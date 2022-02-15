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
