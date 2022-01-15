import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { initialFilter } from 'const/const';
import Filter from './filter';


describe('Component: Filter', () => {

  it('should render Filter correctly', () => {
    const filterState = {...initialFilter};

    render(
      <Filter
        filterState={filterState}
        onUpdateFilter={jest.fn()}
        minMaxPrice={[0, 100]}
      />,
    );

    expect(screen.getByTestId('filter-min-price'))
      .toBeInTheDocument();
    expect(screen.getByTestId('filter-max-price'))
      .toBeInTheDocument();
    expect(screen.getByTestId('filter-type-acoustic'))
      .toBeInTheDocument();
    expect(screen.getByTestId('filter-type-electric'))
      .toBeInTheDocument();
    expect(screen.getByTestId('filter-type-ukulele'))
      .toBeInTheDocument();
    expect(screen.getByTestId('filter-string-four'))
      .toBeInTheDocument();
    expect(screen.getByTestId('filter-string-six'))
      .toBeInTheDocument();
    expect(screen.getByTestId('filter-string-twelve'))
      .toBeInTheDocument();
  });

  it('should update min and max price', () => {
    const filterState = {...initialFilter};
    const onUpdateFilter = jest.fn();

    const { baseElement } = render(
      <Filter
        filterState={filterState}
        onUpdateFilter={onUpdateFilter}
        minMaxPrice={[100, 1000]}
      />,
    );

    const minPriceInput = screen.getByTestId('filter-min-price');
    const maxPriceInput = screen.getByTestId('filter-max-price');

    userEvent.type(minPriceInput, '100');
    userEvent.click(baseElement);
    expect(onUpdateFilter).toBeCalledWith({type: 'setMinPrice', payload: '100'});

    userEvent.type(maxPriceInput, '1000');
    userEvent.click(baseElement);
    expect(onUpdateFilter).toBeCalledWith({type: 'setMaxPrice', payload: '1000'});
  });

  it('should correctly dispatch min and max price', () => {
    const filterState = {...initialFilter};
    const onUpdateFilter = jest.fn();

    const { baseElement } = render(
      <Filter
        filterState={filterState}
        onUpdateFilter={onUpdateFilter}
        minMaxPrice={[100, 1000]}
      />,
    );

    const minPriceInput = screen.getByTestId('filter-min-price');
    const maxPriceInput = screen.getByTestId('filter-max-price');

    userEvent.type(minPriceInput, '1');
    userEvent.click(baseElement);
    expect(onUpdateFilter).toBeCalledWith({type: 'setMinPrice', payload: '100'});

    userEvent.type(maxPriceInput, '4200');
    userEvent.click(baseElement);
    expect(onUpdateFilter).toBeCalledWith({type: 'setMaxPrice', payload: '1000'});
  });

  it('should correctly dispatch guitar type', () => {
    const filterState = {...initialFilter};
    const onUpdateFilter = jest.fn();

    render(
      <Filter
        filterState={filterState}
        onUpdateFilter={onUpdateFilter}
        minMaxPrice={[100, 1000]}
      />,
    );

    const acoustic = screen.getByTestId('filter-type-acoustic');
    const electric = screen.getByTestId('filter-type-electric');
    const ukulele = screen.getByTestId('filter-type-ukulele');

    userEvent.click(acoustic);
    expect(onUpdateFilter).toBeCalledWith({type: 'toggleGuitarType', payload: 'acoustic'});

    userEvent.click(electric);
    expect(onUpdateFilter).toBeCalledWith({type: 'toggleGuitarType', payload: 'electric'});

    userEvent.click(ukulele);
    expect(onUpdateFilter).toBeCalledWith({type: 'toggleGuitarType', payload: 'ukulele'});
  });

  it('should correctly dispatch string count', () => {
    const filterState = {...initialFilter};
    const onUpdateFilter = jest.fn();

    render(
      <Filter
        filterState={filterState}
        onUpdateFilter={onUpdateFilter}
        minMaxPrice={[100, 1000]}
      />,
    );

    const fourStrings = screen.getByTestId('filter-string-four');
    const sixStrings = screen.getByTestId('filter-string-six');
    const sevenStrings = screen.getByTestId('filter-string-seven');
    const twelveStrings = screen.getByTestId('filter-string-twelve');

    userEvent.click(fourStrings);
    expect(onUpdateFilter).toBeCalledWith({type: 'toggleStringCount', payload: 4});

    userEvent.click(sixStrings);
    expect(onUpdateFilter).toBeCalledWith({type: 'toggleStringCount', payload: 6});

    userEvent.click(sevenStrings);
    expect(onUpdateFilter).toBeCalledWith({type: 'toggleStringCount', payload: 7});

    userEvent.click(twelveStrings);
    expect(onUpdateFilter).toBeCalledWith({type: 'toggleStringCount', payload: 12});
  });


});
