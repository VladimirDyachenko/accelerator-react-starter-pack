import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductList from './product-list';
import { Provider } from 'react-redux';
import { NameSpace } from 'store/root-reducer';
import { generateGuitarMock } from 'mock/generate-guitar-mock';

const guitarsList = new Array(10).fill(undefined).map(generateGuitarMock);
const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: ProductList', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render ProductList correctly', () => {
    const store = mockStore(
      {
        [NameSpace.Catalog]: {
          guitars: guitarsList,
          loadingStatus: {
            isLoading: false,
            isError: false,
          },
        },
        [NameSpace.Cart]: {itemsInCartList: []},
      },
    );

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductList />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByTestId('product-image').length).toBe(guitarsList.length);

  });

  it('should show loading spinner', () => {
    const store = mockStore(
      {
        [NameSpace.Catalog]: {
          guitars: [],
          loadingStatus: {
            isLoading: true,
            isError: false,
          },
        },
        [NameSpace.Cart]: {itemsInCartList: []},
      },
    );

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Загрузка/)).toBeInTheDocument();
  });

  it('should show error message', () => {
    const store = mockStore(
      {
        [NameSpace.Catalog]: {
          guitars: [],
          loadingStatus: {
            isLoading: false,
            isError: true,
          },
        },
        [NameSpace.Cart]: {itemsInCartList: []},
      },
    );

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Ошибка загрузки/)).toBeInTheDocument();
  });

  it('should show empty list message', () => {
    const store = mockStore(
      {
        [NameSpace.Catalog]: {
          guitars: [],
          loadingStatus: {
            isLoading: false,
            isError: false,
          },
        },
        [NameSpace.Cart]: {itemsInCartList: []},
      },
    );

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Нет подходящих товаров/)).toBeInTheDocument();
  });
});
