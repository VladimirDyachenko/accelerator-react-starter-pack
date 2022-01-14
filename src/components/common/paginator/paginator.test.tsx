import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Paginator from './paginator';

const history = createMemoryHistory();

describe('Component: Paginator', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render Paginator correctly', () => {
    const totalItems = 30;
    const itemsPerPage = 10;
    render(
      <Router history={history}>
        <Paginator
          currentPage={2}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </Router>,
    );

    expect(screen.getByTestId('prev')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();
    expect(screen.getAllByTestId('page-link').length).toBe(totalItems / itemsPerPage);
  });

  it('should test Paginator logic', () => {
    const itemsPerPage = 10;
    const totalItems = 30;
    const element = (
      <Router history={history}>
        <Paginator
          currentPage={1}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </Router>
    );
    const { container } = render(element);

    expect(screen.queryByTestId('prev')).not.toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();

    const elementWithNewProps = (
      <Router history={history}>
        <Paginator
          currentPage={3}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </Router>
    );

    render(elementWithNewProps, { container });
    expect(screen.queryByTestId('next')).not.toBeInTheDocument();
    expect(screen.getByTestId('prev')).toBeInTheDocument();
  });
});
