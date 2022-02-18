import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { Provider } from 'react-redux';
import { createApi } from 'services/api';
import { addProduct } from 'store/cart-process/actions';
import { State } from 'types/types';
import useAddToCart from './use-add-to-cart';

const api = createApi();
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>([]);

describe('Hook: useAddToCart', () => {
  it('should return modal, "onModalClose" and "onAddToCart"', () => {
    const store = mockStore({});

    const { result, unmount } = renderHook(useAddToCart, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.onModalClose).toEqual(expect.any(Function));
    expect(result.current.onModalClose).toEqual(expect.any(Function));

    render(result.current.modal);
    expect(screen.getByTestId('modal-container-close')).toBeInTheDocument();
    unmount();
  });

  it('should close modal', () => {
    const store = mockStore({});
    const mockProduct = generateGuitarMock();

    const { result, unmount } = renderHook(useAddToCart, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.onAddToCart(mockProduct);
    });

    const { rerender } = render(result.current.modal);
    expect(screen.getByTestId('add-to-cart-modal-confirm')).toBeInTheDocument();

    act(() => {
      result.current.onModalClose();
    });

    rerender(result.current.modal);
    expect(screen.queryByTestId('add-to-cart-modal-confirm')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-success-close')).not.toBeInTheDocument();

    unmount();
  });

  it('should test add to cart process', () => {
    const store = mockStore({});
    const mockProduct = generateGuitarMock();

    const { result, unmount } = renderHook(useAddToCart, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.onAddToCart(mockProduct);
    });

    const { rerender } = render(result.current.modal);

    //Confirmation modal should be on screen
    userEvent.click(screen.getByTestId('add-to-cart-modal-confirm'));
    rerender(result.current.modal);
    expect(screen.getByTestId('add-success-modal')).toBeInTheDocument();

    //Success modal should be on screen
    userEvent.click(screen.getByTestId('add-success-close'));
    rerender(result.current.modal);
    expect(screen.queryByTestId('add-success-close')).not.toBeInTheDocument();

    //Add to cart dispatch check
    expect(store.getActions()).toEqual([addProduct(mockProduct.id, 1)]);

    unmount();
  });
});
