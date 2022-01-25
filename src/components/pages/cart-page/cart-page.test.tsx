import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import CartPage from './cart-page';

const history = createMemoryHistory();

describe('Component: CartPage', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render CartPage correctly', () => {

    render(
      <Router history={history}>
        <CartPage />
      </Router>,
    );

    expect(screen.getByText('Промокод на скидку')).toBeInTheDocument();
  });
});
