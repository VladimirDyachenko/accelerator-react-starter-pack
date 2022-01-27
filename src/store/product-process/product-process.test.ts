import { generateCommentMock } from 'mock/generate-comment-mock';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { ProductProcess } from 'types/types';
import { setProductData, addProductComment } from './actions';
import { productProcess } from './product-process';

describe('Reducer: catalogProcess', () => {
  it('without additional parameters should return initial state', () => {
    const product = generateGuitarMock();
    const state: ProductProcess = {
      product: product,
    };

    expect(productProcess(state, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should set product data', () => {
    const product = generateGuitarMock();
    const state: ProductProcess = {
      product: undefined,
    };

    expect(productProcess(state, setProductData(product)))
      .toEqual({...state, product: product});
  });

  it('should add new comment at the start', () => {
    const product = generateGuitarMock();
    product.comments = new Array(3).fill(undefined).map(generateCommentMock);

    const newCommentMock = generateCommentMock();

    const state: ProductProcess = {
      product: product,
    };

    const oldComments = state.product?.comments ?? [];

    expect(
      productProcess(state, addProductComment(newCommentMock)),
    )
      .toEqual(
        {
          ...state,
          product: {
            ...state.product,
            comments: [newCommentMock, ...oldComments],
          },
        },
      );
  });

});
