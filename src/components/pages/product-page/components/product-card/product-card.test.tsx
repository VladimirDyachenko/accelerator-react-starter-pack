import { render, screen } from '@testing-library/react';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { createMemoryHistory } from 'history';
import ProductCard from './product-card';
import { Router } from 'react-router-dom';

const history = createMemoryHistory();

describe('Component: ProductCard', () => {
  beforeEach(() => {
    history.push('/product-page');
  });
  it('should render ProductCard correctly', () => {
    const product = generateGuitarMock();
    product.price = 15000;

    render(
      <Router history={history}>
        <ProductCard product={product} />
      </Router>,
    );

    expect(screen.getByText(/15 000/)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByTestId('product-card-title')).toHaveTextContent(product.name);
  });

});
