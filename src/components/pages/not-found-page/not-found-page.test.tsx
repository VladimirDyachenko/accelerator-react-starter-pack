import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render NotFoundPage correctly', () => {

    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('На главную');
  });
});
