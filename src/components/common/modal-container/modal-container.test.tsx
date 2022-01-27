import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalContainer from './modal-container';


describe('Component: ModalContainer', () => {

  it('should add scroll-lock class to body and add focus event listener and cleanup correctly', () => {
    const onModalClose = jest.fn();
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();
    const modalName = 'test';

    const { rerender } = render(<ModalContainer modalName={modalName} onModalClose={onModalClose} />);

    expect(document.body.classList.contains('scroll-lock')).toBe(true);
    expect(document.addEventListener).toBeCalledWith('focusin', expect.any(Function));

    rerender(<ModalContainer modalName={undefined} onModalClose={onModalClose} />);

    expect(document.body.classList.contains('scroll-lock')).toBe(false);
    expect(document.removeEventListener).toBeCalledWith('focusin', expect.any(Function));
  });

  it('should call onModalClose after click', () => {
    const onModalClose = jest.fn();

    render(<ModalContainer modalName={'modalName'} onModalClose={onModalClose} />);

    userEvent.click(screen.getByTestId('modal-container-close'));

    expect(onModalClose).toBeCalledTimes(1);
  });

});
