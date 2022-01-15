import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import ProductPage from './product-page';

const history = createMemoryHistory();

describe('Component: ProductPage', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render ProductPage correctly', () => {

    render(<ProductPage />);

    expect(screen.getByText(/Гитара подходит как для старта обучения/)).toBeInTheDocument();
  });
});
