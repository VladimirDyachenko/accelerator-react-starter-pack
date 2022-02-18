import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRoute } from 'const/const';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import AddToCartSuccessModal from './add-to-cart-success-modal';

const history = createMemoryHistory();

describe('Component: AddToCartSuccessModal', () => {
  beforeEach(() => {
    history.push('/test');
  });

  it('should render CartItem correctly', () => {

    render(
      <AddToCartSuccessModal onModalClose={jest.fn()} />,
    );

    expect(screen.getByText(/добавлен в корзину/)).toBeInTheDocument();
    expect(screen.getByTestId('success-modal-to-cart')).toBeInTheDocument();
    expect(screen.getByTestId('success-modal-to-continue')).toBeInTheDocument();
  });

  it(`should redirect to "${AppRoute.Cart}" after cart link click`, () => {

    render(
      <Router history={history}>
        <AddToCartSuccessModal onModalClose={jest.fn()} />,
      </Router>,
    );

    userEvent.click(screen.getByTestId('success-modal-to-cart'));

    expect(history.location.pathname).toBe(AppRoute.Cart);
  });

  it(`should redirect to "${AppRoute.Catalog}" after click continue button on "${AppRoute.Product}" page`, () => {
    history.push(AppRoute.Product);
    render(
      <Router history={history}>
        <AddToCartSuccessModal onModalClose={jest.fn()} />,
      </Router>,
    );

    userEvent.click(screen.getByTestId('success-modal-to-continue'));

    expect(history.location.pathname).toBe(AppRoute.Catalog);
  });

  it('should call "onModalClose" after click continue on any different page', () => {
    const onModalClose = jest.fn();

    render(
      <Router history={history}>
        <AddToCartSuccessModal onModalClose={onModalClose} />,
      </Router>,
    );

    userEvent.click(screen.getByTestId('success-modal-to-continue'));

    expect(onModalClose).toBeCalledTimes(1);
  });

});
