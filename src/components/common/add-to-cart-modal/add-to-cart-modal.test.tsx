import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateGuitarMock } from 'mock/generate-guitar-mock';

import AddToCartModal from './add-to-cart-modal';

describe('Component: AddToCartModal', () => {

  it('should render AddToCartModal correctly', () => {
    const mockProduct = generateGuitarMock();

    render(
      <AddToCartModal onModalClose={jest.fn()} onConfirmClick={jest.fn()} product={mockProduct} />,
    );

    expect(screen.getByText(/Добавить товар в корзину/)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByTestId('add-to-cart-modal-confirm')).toBeInTheDocument();
    expect(screen.getByTestId('add-to-cart-modal-close')).toBeInTheDocument();
  });

  it('should call "omModalClose"', () => {
    const mockProduct = generateGuitarMock();
    const onModalClose = jest.fn();

    render(
      <AddToCartModal onModalClose={onModalClose} onConfirmClick={jest.fn()} product={mockProduct} />,
    );

    userEvent.click(screen.getByTestId('add-to-cart-modal-close'));
    expect(onModalClose).toBeCalledTimes(1);
  });

  it('should call "onConfirmClick"', () => {
    const mockProduct = generateGuitarMock();
    const onConfirmClick = jest.fn();

    render(
      <AddToCartModal onModalClose={jest.fn} onConfirmClick={onConfirmClick} product={mockProduct} />,
    );

    userEvent.click(screen.getByTestId('add-to-cart-modal-confirm'));
    expect(onConfirmClick).toBeCalledTimes(1);
  });

});
