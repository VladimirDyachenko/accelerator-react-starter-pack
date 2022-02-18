import { Guitar } from 'types/types';

export type CartProcess = {
  itemsInCartList: Array<{id: number, amount: number}>;
  productsData: {
    [id: number]: Guitar
  };
  discount: number;
  coupon: string | null;
}
