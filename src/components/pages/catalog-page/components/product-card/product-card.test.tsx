import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRoute } from 'const/const';
import { createMemoryHistory } from 'history';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { Router } from 'react-router-dom';
import ProductCard from './product-card';

const history = createMemoryHistory();

describe('Component: ProductCard', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  const mockGuitar = generateGuitarMock();

  it('should render ProductCard correctly', () => {

    render(
      <Router history={history}>
        <ProductCard product={mockGuitar}/>
      </Router>,
    );

    expect(screen.getByTestId('product-image').getAttribute('src'))
      .toBe(mockGuitar.previewImg);
    expect(screen.getByTestId('product-image').getAttribute('alt'))
      .toBe(mockGuitar.name);
    expect(screen.getByTestId('string-count').textContent)
      .toBe(mockGuitar.stringCount.toString());
    expect(screen.getByTestId('product-name').textContent)
      .toBe(mockGuitar.name);
  });

  it(`should redirect to /${AppRoute.Product}/${mockGuitar.id}`, () => {

    render(
      <Router history={history}>
        <ProductCard product={mockGuitar}/>
      </Router>,
    );

    const linkToDetailsPage = screen.getByTestId('details-link');
    userEvent.click(linkToDetailsPage);

    expect(history.location.pathname)
      .toBe(`${AppRoute.Product}/${mockGuitar.id}`);

  });
});
