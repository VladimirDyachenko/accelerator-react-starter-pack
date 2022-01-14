import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render Footer correctly', () => {
    render(<Footer />);

    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/))
      .toBeInTheDocument();
  });

});
