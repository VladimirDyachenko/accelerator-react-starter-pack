import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import CartPage from './cart-page';

const history = createMemoryHistory();

describe('Component: CartPage', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render CartPage correctly', () => {

    render(<CartPage />);

    expect(screen.getByText('Промокод на скидку')).toBeInTheDocument();
  });
});
