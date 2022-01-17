import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NotFoundPage from './not-found-page';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render NotFoundPage correctly', () => {

    render(
      <Router history={history}>
        <NotFoundPage />
      </Router>,
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('На главную');
  });
});
