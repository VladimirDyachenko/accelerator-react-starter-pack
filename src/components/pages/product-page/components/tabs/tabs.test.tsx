import { render, screen } from '@testing-library/react';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Tabs from './tabs';
import { TabOption } from 'const/const';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Tabs', () => {
  beforeEach(() => {
    history.push(`/product-page${TabOption.Characteristics}`);
  });
  it('should render Tabs correctly', () => {

    const product = generateGuitarMock();

    render(
      <Router history={history}>
        <Tabs product={product} />
      </Router>,
    );

    expect(screen.getByText(product.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${product.stringCount} струнная`)).toBeInTheDocument();
  });

  it(`should add anchor "${TabOption.Characteristics}" to URL`, () => {
    history.push('/product-page');

    const product = generateGuitarMock();

    render(
      <Router history={history}>
        <Tabs product={product} />
      </Router>,
    );

    expect(history.location.hash).toBe(TabOption.Characteristics);
  });

  it('should switch tab after click', () => {
    const product = generateGuitarMock();

    render(
      <Router history={history}>
        <Tabs product={product} />
      </Router>,
    );

    userEvent.click(screen.getByTestId('tabs-link-description'));
    expect(history.location.hash).toBe(TabOption.Description);

    expect(screen.getByTestId('tabs-description-text'))
      .toHaveTextContent(product.description);
  });

});
