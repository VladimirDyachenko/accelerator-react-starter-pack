import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Header from './header';

const history = createMemoryHistory();

describe('Component: Header', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render Header correctly', () => {
    render(<Header />);

    expect(screen.getByText(/Каталог/)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/)).toBeInTheDocument();
    expect(screen.getByText(/О компании/)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/)).toBeInTheDocument();
  });

});