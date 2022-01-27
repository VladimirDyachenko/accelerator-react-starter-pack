import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddReviewSuccessModal from './add-review-success-modal';

describe('Component: AddReviewSuccessModal', () => {

  it('should render AddReviewSuccessModal correctly and call onModalClose', () => {
    const onModalClose = jest.fn();

    render(<AddReviewSuccessModal onModalClose={onModalClose} />);

    const closeButton = screen.getByTestId('add-review-success');

    expect(screen.getByText(/Спасибо за ваш отзыв/)).toBeInTheDocument();

    userEvent.click(closeButton);
    expect(onModalClose).toBeCalledTimes(1);
  });

});
