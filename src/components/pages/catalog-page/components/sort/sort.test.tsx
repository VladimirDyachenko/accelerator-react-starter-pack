import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Sort from './sort';

const history = createMemoryHistory();

describe('Component: Sort', () => {
  beforeEach(() => {
    history.push({ pathname: '/', search: ''});
  });

  it('should render Sort correctly', () => {
    const onSetSort = jest.fn();

    render(
      <Router history={history}>
        <Sort onSortChange={onSetSort}/>
      </Router>,
    );

    expect(screen.getByTestId('sort-by-price'))
      .toBeInTheDocument();
    expect(screen.getByTestId('sort-by-rating'))
      .toBeInTheDocument();
    expect(screen.getByTestId('sort-order-acs'))
      .toBeInTheDocument();
    expect(screen.getByTestId('sort-order-desc'))
      .toBeInTheDocument();
  });

  it('should call `onSortChange` with right arguments', async () => {
    const onSortChange = jest.fn();

    render(
      <Router history={history}>
        <Sort onSortChange={onSortChange}/>
      </Router>,
    );

    userEvent.click(screen.getByTestId('sort-by-price'));
    await waitFor(() => expect(onSortChange)
      .lastCalledWith({ order: 'acs', sortProperty: 'price' }));

    userEvent.click(screen.getByTestId('sort-by-rating'));
    await waitFor(() => expect(onSortChange)
      .lastCalledWith({ order: 'acs', sortProperty: 'rating' }));

    userEvent.click(screen.getByTestId('sort-order-acs'));
    await waitFor(() => expect(onSortChange)
      .lastCalledWith({ order: 'acs', sortProperty: 'rating' }));

    userEvent.click(screen.getByTestId('sort-order-desc'));
    await waitFor(() => expect(onSortChange)
      .lastCalledWith({ order: 'desc', sortProperty: 'rating' }));

  });

  it('should test getInitialSortState', async () => {
    const onSortChange = jest.fn();

    history.push({search: '?_sort=rating&_order=desc'});

    render(
      <Router history={history}>
        <Sort onSortChange={onSortChange}/>
      </Router>,
    );

    expect(onSortChange)
      .toBeCalledWith({ order: 'desc', sortProperty: 'rating' });
  });

});
