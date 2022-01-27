import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { ApiRoute, AppRoute, REVIEWS_PER_STEP } from 'const/const';
import { createApi } from 'services/api';
import { generateGuitarMock } from 'mock/generate-guitar-mock';
import { NameSpace } from 'store/root-reducer';
import { State } from 'types/types';
import Reviews from './reviews';
import userEvent from '@testing-library/user-event';
import { generateCommentMock } from 'mock/generate-comment-mock';

const history = createMemoryHistory();
const api = createApi();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const productMock = generateGuitarMock();
const commentsMock = new Array(10).fill(undefined).map(generateCommentMock);

const store = mockStore({
  [NameSpace.Product]: {product: productMock},
});

describe('Component: Reviews', () => {
  beforeAll(() => {
    // Mock IntersectionObserver
    class IntersectionObserver {
      observe = jest.fn();

      disconnect = jest.fn();

      unobserve = jest.fn();
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: IntersectionObserver,
    });

    Object.defineProperty(global, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: IntersectionObserver,
    });
  });

  beforeEach(() => {
    history.push(`${AppRoute.Product}/${productMock.id}`);
    mockAPI.reset();
  });

  it('should render Reviews correctly', async () => {
    mockAPI
      .onGet(`${ApiRoute.Guitars}/${productMock.id}?_embed=comments`)
      .reply(200, productMock);

    const testElement = ({scrollIntoView: jest.fn()} as never as HTMLElement);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`${AppRoute.Product}/:id`}>
              <Reviews
                reviews={commentsMock}
                pageStart={{current: testElement}}
                guitarData={
                  {
                    id: 0,
                    name: 'test',
                  }
                }
              />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getAllByTestId('review-item-heading').length).toBe(REVIEWS_PER_STEP);

    userEvent.click(screen.getByTestId('reviews-button-up'));
    expect(testElement.scrollIntoView).toBeCalledTimes(1);
  });

  it('should test interaction logic', () => {
    mockAPI
      .onGet(`${ApiRoute.Guitars}/${productMock.id}?_embed=comments`)
      .reply(200, productMock);

    const testElement = ({scrollIntoView: jest.fn()} as never as HTMLElement);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`${AppRoute.Product}/:id`}>
              <Reviews
                reviews={commentsMock}
                pageStart={{current: testElement}}
                guitarData={
                  {
                    id: 0,
                    name: 'unique-test-guitar-name',
                  }
                }
              />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('reviews-button-up'));
    expect(testElement.scrollIntoView).toBeCalledTimes(1);

    userEvent.click(screen.getByTestId('reviews-button-load-more'));
    expect(screen.getAllByTestId('review-item-heading').length).toBe(REVIEWS_PER_STEP * 2);

    userEvent.click(screen.getByTestId('reviews-button-add'));
    expect(screen.getByTestId('add-review-heading')).toBeInTheDocument();
  });
});
