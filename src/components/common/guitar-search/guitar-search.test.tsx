import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import GuitarSearch from './guitar-search';
import { MutableRefObject } from 'react';
const history = createMemoryHistory();

let mockSearchList: {id: number, name: string}[] = [];

jest.mock('hooks/hooks', () => ({
  useGuitarSearch: (searchTerm: string) => [{data: mockSearchList, error: null}],
  useClickOutside: (
    elementRef: MutableRefObject<HTMLElement>,
    callback: (e: MouseEvent) => void,
  ) => undefined,
}));

describe('Component: GuitarSearch', () => {
  beforeEach(() => {
    history.push('test-page');
    mockSearchList = [];
  });

  it('should render GuitarSearch correctly', () => {
    render(<GuitarSearch />);

    expect(screen.getByText(/Начать поиск/)).toBeInTheDocument();
    expect(screen.getByTestId('guitar-search-input')).toBeInTheDocument();
    const resultList = screen.getByTestId('search-ul');
    expect(resultList).toHaveClass('hidden');
  });

  it('should render GuitarSearch with results correctly', () => {
    mockSearchList.push({id: 0, name: 'testName'});

    render(<GuitarSearch />);

    const resultList = screen.getByTestId('search-ul');
    expect(resultList).not.toHaveClass('hidden');
    expect(screen.getAllByRole('listitem').length).toBe(mockSearchList.length);
  });
});
