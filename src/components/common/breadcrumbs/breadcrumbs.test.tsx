import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

describe('Component: Breadcrumbs', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render Breadcrumbs correctly', () => {
    const crumbs = [
      {
        label: 'root-label',
        to: 'root',
      },
      {
        label: 'current-page',
        to: 'current-page',
      },
    ];


    render(
      <Router history={history}>
        <Breadcrumbs
          items={crumbs}
        />
      </Router>,
    );

    expect(screen.getByText(crumbs[0].label)).toBeInTheDocument();
    expect(screen.getByText(crumbs[1].label)).toBeInTheDocument();

    userEvent.click(screen.getByText(crumbs[0].label));
    expect(history.location.pathname).toBe(`/${crumbs[0].to}`);
  });

  it('should redirect to new path after click', () => {
    const crumbs = [
      {
        label: 'root-label',
        to: 'root',
      },
      {
        label: 'current-page',
        to: 'current-page',
      },
    ];


    render(
      <Router history={history}>
        <Breadcrumbs
          items={crumbs}
        />
      </Router>,
    );

    userEvent.click(screen.getByText(crumbs[0].label));
    expect(history.location.pathname).toBe(`/${crumbs[0].to}`);
  });
});
