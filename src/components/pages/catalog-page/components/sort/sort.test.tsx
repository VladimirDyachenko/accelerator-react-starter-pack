import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Sort from './sort';


describe('Component: Sort', () => {

  it('should render Sort correctly', () => {
    const onSetSort = jest.fn();

    render(
      <Sort
        currentOption={{order: undefined, sortProperty: undefined }}
        onSetSort={onSetSort}
      />,
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

  it('should call `onSetSort` with right arguments', () => {
    const onSetSort = jest.fn();

    render(
      <Sort
        currentOption={{order: undefined, sortProperty: undefined }}
        onSetSort={onSetSort}
      />,
    );

    userEvent.click(screen.getByTestId('sort-by-price'));
    expect(onSetSort)
      .toBeCalledWith({order: undefined, sortProperty: 'price'});

    userEvent.click(screen.getByTestId('sort-by-rating'));
    expect(onSetSort)
      .toBeCalledWith({order: undefined, sortProperty: 'rating'});

    userEvent.click(screen.getByTestId('sort-order-acs'));
    expect(onSetSort)
      .toBeCalledWith({order: 'acs', sortProperty: undefined});

    userEvent.click(screen.getByTestId('sort-order-desc'));
    expect(onSetSort)
      .toBeCalledWith({order: 'desc', sortProperty: undefined});
  });

});
