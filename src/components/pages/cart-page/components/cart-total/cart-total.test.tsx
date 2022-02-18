import { render, screen } from '@testing-library/react';

import CartTotal from './cart-total';

describe('Component: CartTotal', () => {

  it('should render CartTotal correctly', () => {
    const total = 100;
    let discount = 0;

    const { rerender } = render(
      <CartTotal total={total} discount={discount} />,
    );

    expect(screen.getByTestId('cart-total-value')).toHaveTextContent(total.toString());
    expect(screen.getByTestId('cart-total-discount')).toHaveTextContent(discount.toString());
    expect(screen.getByTestId('cart-total-value-payment')).toHaveTextContent((total - discount).toString());

    discount = total / 2;
    rerender(<CartTotal total={total} discount={discount} />);

    expect(screen.getByTestId('cart-total-discount')).toHaveClass('cart__total-value--bonus');
    expect(screen.getByTestId('cart-total-value-payment')).toHaveTextContent((total - discount).toString());
  });

});
