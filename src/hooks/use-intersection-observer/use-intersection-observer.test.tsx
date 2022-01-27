import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Api, ApiRoute } from 'const/const';
import useIntersectionObserver from './use-intersection-observer';

const observe = jest.fn();
const disconnect = jest.fn();
const unobserve = jest.fn();

describe('Hook: useIntersectionObserver', () => {
  beforeAll(() => {
    // Mock IntersectionObserver
    class IntersectionObserver {
      observe = observe;

      disconnect = disconnect;

      unobserve = unobserve;
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

  it('should observe on init and disconnect after element ref changes', async () => {

    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet(`${Api.Url}${ApiRoute.Guitars}?name_like=test`).reply(200, ['response from api']);

    const htmlElement = document.createElement('div');

    const { rerender } = renderHook(
      ({ elementRef, options }) => useIntersectionObserver(elementRef, options),
      {
        initialProps: {elementRef: { current: htmlElement }, options: {}},
      },
    );

    expect(observe).toBeCalledWith(htmlElement);

    rerender({elementRef: { current: (null as never) }, options: {}});

    expect(disconnect).toBeCalledTimes(1);
    expect(observe).toBeCalledTimes(1);
  });

});
