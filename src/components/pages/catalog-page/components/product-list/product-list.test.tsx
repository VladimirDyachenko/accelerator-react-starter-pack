import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductList from './product-list';
import { Provider } from 'react-redux';
import { NameSpace } from 'store/root-reducer';
import { generateGuitarMock } from 'mock/generate-guitar-mock';

const guitarsList = new Array(datatype.number(10)).fill(undefined).map(generateGuitarMock);
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore(
  {
    [NameSpace.Catalog]: {
      guitars: guitarsList,
    },
  },
);

describe('Component: ProductList', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render ProductList correctly', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductList />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByTestId('product-image').length).toBe(guitarsList.length);

  });

});
