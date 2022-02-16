import { Guitar } from 'types/types';

export type CartProcess = {
  inCart: Array<{id: number, amount: number}>;
  productData: {
    [id: number]: Guitar
  };
  discount: number;
  coupon: string | null;
}
