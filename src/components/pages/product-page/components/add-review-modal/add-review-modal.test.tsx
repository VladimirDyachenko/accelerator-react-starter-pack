import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddReviewModal from './add-review-modal';


describe('Component: AddReviewModal', () => {

  it('should render AddReviewModal correctly', () => {
    render(
      <AddReviewModal
        guitarData={{id: 1, name: 'test-guitar'}}
        onSubmit={jest.fn()}
        onModalClose={jest.fn()}
      />,
    );

    expect(screen.getByTestId('add-review-modal-heading')).toHaveTextContent('test-guitar');

    expect(screen.getByText('Ваше Имя')).toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-name-warning')).not.toBeInTheDocument();

    expect(screen.getByText('Ваша Оценка')).toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-rating-warning')).not.toBeInTheDocument();

    expect(screen.getByText('Достоинства')).toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-pros-warning')).not.toBeInTheDocument();

    expect(screen.getByText('Достоинства')).toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-cons-warning')).not.toBeInTheDocument();

    expect(screen.getByText('Комментарий')).toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-comment-warning')).not.toBeInTheDocument();

    expect(screen.getByTestId('add-review-modal-submit-button')).toBeInTheDocument();
  });

  it('should call "onSubmit"', () => {
    const onSubmit = jest.fn();
    const mockReview = {
      guitarId: 1,
      userName: 'Random user name',
      advantage: 'Advantage list',
      disadvantage: 'Disadvantage list',
      comment: 'Comment text',
      rating: 5,
    };

    render(
      <AddReviewModal
        guitarData={{id: mockReview.guitarId, name: 'test-guitar'}}
        onSubmit={onSubmit}
        onModalClose={jest.fn()}
      />,
    );

    const nameInput = screen.getByTestId('add-review-modal-name-input');
    const ratingRadioButtons = screen.getAllByTestId('add-review-modal-radio-input') as unknown as HTMLInputElement[];
    const advantageInput = screen.getByTestId('add-review-modal-pros-input');
    const disadvantageInput = screen.getByTestId('add-review-modal-disadvantage-input');
    const commentInput = screen.getByTestId('add-review-modal-comment-input');
    const submitButton = screen.getByTestId('add-review-modal-submit-button');

    userEvent.type(nameInput, mockReview.userName);
    const radioInput = ratingRadioButtons.find((inputElement) => parseInt(inputElement.value, 10) === mockReview.rating);
    if (radioInput) {
      userEvent.click(radioInput);
    }
    userEvent.type(advantageInput, mockReview.advantage);
    userEvent.type(disadvantageInput, mockReview.disadvantage);
    userEvent.type(commentInput, mockReview.comment);

    userEvent.click(submitButton);

    expect(onSubmit).toBeCalledWith({...mockReview }, expect.any(Function));
  });

  it('should test form validation', () => {
    const mockReview = {
      guitarId: 1,
      userName: 'Random user name',
      advantage: 'Advantage list',
      disadvantage: 'Disadvantage list',
      comment: 'Comment text',
      rating: 5,
    };

    render(
      <AddReviewModal
        guitarData={{id: mockReview.guitarId, name: 'test-guitar'}}
        onSubmit={jest.fn()}
        onModalClose={jest.fn()}
      />,
    );

    const nameInput = screen.getByTestId('add-review-modal-name-input');
    const ratingRadioButtons = screen.getAllByTestId('add-review-modal-radio-input') as unknown as HTMLInputElement[];
    const advantageInput = screen.getByTestId('add-review-modal-pros-input');
    const disadvantageInput = screen.getByTestId('add-review-modal-disadvantage-input');
    const commentInput = screen.getByTestId('add-review-modal-comment-input');
    const submitButton = screen.getByTestId('add-review-modal-submit-button');

    //Отправка пустой формы
    userEvent.click(submitButton);

    expect(screen.getByTestId('add-review-modal-name-warning')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-rating-warning')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-pros-warning')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-cons-warning')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-comment-warning')).toBeInTheDocument();

    //Отправка формы с валидным nameInput
    userEvent.type(nameInput, mockReview.userName);
    userEvent.click(submitButton);

    expect(screen.queryByTestId('add-review-modal-name-warning')).not.toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-rating-warning')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-pros-warning')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-cons-warning')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-comment-warning')).toBeInTheDocument();

    //Отправка формы с валидным именем и рейтингом
    userEvent.click(ratingRadioButtons[0]);
    userEvent.click(submitButton);

    expect(screen.queryByTestId('add-review-modal-name-warning')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-rating-warning')).not.toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-pros-warning')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-cons-warning')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-comment-warning')).toBeInTheDocument();

    //Отправка формы с валидным именем, рейтингом и достоинствами
    userEvent.type(advantageInput, mockReview.advantage);
    userEvent.click(submitButton);

    expect(screen.queryByTestId('add-review-modal-name-warning')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-rating-warning')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-pros-warning')).not.toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-cons-warning')).toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-comment-warning')).toBeInTheDocument();

    //Отправка формы с валидным именем, рейтингом, достоинствами и недостатками
    userEvent.type(disadvantageInput, mockReview.disadvantage);
    userEvent.click(submitButton);

    expect(screen.queryByTestId('add-review-modal-name-warning')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-rating-warning')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-pros-warning')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-cons-warning')).not.toBeInTheDocument();
    expect(screen.getByTestId('add-review-modal-comment-warning')).toBeInTheDocument();

    //Отправка валидной формы
    userEvent.type(commentInput, mockReview.comment);
    userEvent.click(submitButton);

    expect(screen.queryByTestId('add-review-modal-name-warning')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-rating-warning')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-pros-warning')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-cons-warning')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review-modal-comment-warning')).not.toBeInTheDocument();
  });

  it('should show error message', () => {
    const onSubmit = jest.fn();
    const mockReview = {
      guitarId: 1,
      userName: 'Random user name',
      advantage: 'Advantage list',
      disadvantage: 'Disadvantage list',
      comment: 'Comment text',
      rating: 5,
    };

    render(
      <AddReviewModal
        guitarData={{id: mockReview.guitarId, name: 'test-guitar'}}
        onSubmit={onSubmit}
        onModalClose={jest.fn()}
      />,
    );

    const nameInput = screen.getByTestId('add-review-modal-name-input');
    const ratingRadioButtons = screen.getAllByTestId('add-review-modal-radio-input') as unknown as HTMLInputElement[];
    const advantageInput = screen.getByTestId('add-review-modal-pros-input');
    const disadvantageInput = screen.getByTestId('add-review-modal-disadvantage-input');
    const commentInput = screen.getByTestId('add-review-modal-comment-input');
    const submitButton = screen.getByTestId('add-review-modal-submit-button');

    userEvent.type(nameInput, mockReview.userName);
    userEvent.click(ratingRadioButtons[0]);
    userEvent.type(advantageInput, mockReview.advantage);
    userEvent.type(disadvantageInput, mockReview.disadvantage);
    userEvent.type(commentInput, mockReview.comment);

    userEvent.click(submitButton);

    act(() => onSubmit.mock.calls[0][1](['Сообщение об ошибке из теста']));

    expect(screen.getByText('Сообщение об ошибке из теста')).toBeInTheDocument();
  });
});
