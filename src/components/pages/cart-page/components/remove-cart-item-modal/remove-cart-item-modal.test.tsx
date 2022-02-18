import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateGuitarMock } from 'mock/generate-guitar-mock';

import RemoveCartItemModal from './remove-cart-item-modal';

describe('Component: RemoveCartItemModal', () => {

  it('should render RemoveCartItemModal correctly', () => {
    const productMock = generateGuitarMock();

    render(
      <RemoveCartItemModal
        productData={productMock}
        onConfirmClick={jest.fn()}
        onModalClose={jest.fn()}
      />,
    );

    expect(screen.getByTestId('remove-modal-header')).toBeInTheDocument();
    expect(screen.getByTestId('remove-modal-product-name')).toHaveTextContent(productMock.name);
    expect(screen.getByTestId('remove-modal-confirm')).toBeInTheDocument();
    expect(screen.getByTestId('remove-modal-decline')).toBeInTheDocument();
  });

  it('should call cb\'s after user action', () => {
    const productMock = generateGuitarMock();
    const onConfirmClick = jest.fn();
    const onModalClose = jest.fn();

    render(
      <RemoveCartItemModal
        productData={productMock}
        onConfirmClick={onConfirmClick}
        onModalClose={onModalClose}
      />,
    );

    userEvent.click(screen.getByTestId('remove-modal-confirm'));
    expect(onConfirmClick).toBeCalledTimes(1);
    onConfirmClick.mockReset();

    userEvent.click(screen.getByTestId('remove-modal-decline'));
    expect(onModalClose).toBeCalledTimes(1);
    onModalClose.mockReset();
  });
});
