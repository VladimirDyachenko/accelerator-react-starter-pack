import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateGuitarMock } from 'mock/generate-guitar-mock';

import CartItem from './cart-item';

describe('Component: CartItem', () => {

  it('should render CartItem correctly', () => {
    const productData = generateGuitarMock();
    const amount = 2;

    render(
      <CartItem productData={productData} amount={amount} onAmountUpdate={jest.fn()} />,
    );

    expect(screen.getByTestId('cart-item-delete-button')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-name')).toHaveTextContent(productData.name);
    expect(screen.getByTestId('cart-item-vendor-code')).toHaveTextContent(productData.vendorCode);
    expect(screen.getByTestId('cart-item-price')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-decrement')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-input')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-increment')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-total-price')).toBeInTheDocument();
  });

  it('should test user interaction process', () => {
    const productData = generateGuitarMock();
    const amount = 2;
    const onAmountUpdate = jest.fn();

    render(
      <CartItem productData={productData} amount={amount} onAmountUpdate={onAmountUpdate} />,
    );

    const deleteButton = screen.getByTestId('cart-item-delete-button');
    const decrementButton = screen.getByTestId('cart-item-decrement');
    const incrementButton = screen.getByTestId('cart-item-increment');
    const inputField = screen.getByTestId('cart-item-input');

    userEvent.click(deleteButton);
    expect(onAmountUpdate).toBeCalledWith(productData.id, 0);
    onAmountUpdate.mockReset();

    userEvent.click(decrementButton);
    expect(onAmountUpdate).toBeCalledWith(productData.id, amount - 1);
    onAmountUpdate.mockReset();

    userEvent.click(incrementButton);
    expect(onAmountUpdate).toBeCalledWith(productData.id, amount + 1);
    onAmountUpdate.mockReset();

    userEvent.clear(inputField);
    userEvent.type(inputField, '25');
    userEvent.tab();
    expect(onAmountUpdate).toBeCalledWith(productData.id, 25);
  });

});
