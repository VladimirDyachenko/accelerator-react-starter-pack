import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import useClickOutside from './use-click-outside';

describe('Hook: useClickOutside', () => {

  it('should not call CB after click inside', () => {
    const jestFn = jest.fn();
    function TestComponent() {
      const ref = useRef(null);
      const cb = (_: MouseEvent) => jestFn();
      useClickOutside(ref, cb);

      return (
        <div >
          <p data-testid='outside'></p>
          <div
            data-testid='inside'
            ref={ref}
          >
          </div>
        </div>
      );
    }

    render(<TestComponent/>);

    expect(jestFn).not.toBeCalled();

    userEvent.click(screen.getByTestId('inside'));
    expect(jestFn).not.toBeCalled();
  });

  it('should call CB after click outside', () => {
    const jestFn = jest.fn();

    function TestComponent() {
      const ref = useRef(null);
      const cb = (_: MouseEvent) => jestFn();
      useClickOutside(ref, cb);

      return (
        <div >
          <p data-testid='outside'></p>
          <div
            data-testid='inside'
            ref={ref}
          >
          </div>
        </div>
      );
    }

    render(<TestComponent/>);

    expect(jestFn).not.toBeCalled();

    userEvent.click(screen.getByTestId('outside'));
    expect(jestFn).toBeCalled();
  });


});
