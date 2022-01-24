import { Comment, Guitar } from 'types/types';

export type ProductProcess = {
  product: Guitar | undefined;
  comments: Comment[];
}
