import { ratingOptions } from 'const/const';
import {Fragment, FormEvent, memo, useMemo, useState } from 'react';
import { CommentPost } from 'types/types';

type AddReviewModalProps = {
  guitarData: {id: number, name: string};
  onSubmit: (comment: CommentPost, onError: (message: string[]) => void) => void;
  onModalClose: () => void;
};

function AddReviewModal({guitarData, onSubmit, onModalClose}: AddReviewModalProps) {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState('');
  const [hoverRating, setHoverRating] = useState('');
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');
  const [comment, setComment] = useState('');
  const [formValidity, setFormValidity] = useState(
    { userName: true, rating: true, advantage: true, disadvantage: true, comment: true },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<Array<string>>();

  const validateForm = () => {
    const isNameValid = userName.length > 0;
    const isRatingValid = rating !== '';
    const isAdvantageValid = advantage !== '';
    const isDisadvantageValid = disadvantage !== '';
    const isCommentValid = comment !== '';

    setFormValidity({
      userName: isNameValid,
      rating: isRatingValid,
      advantage: isAdvantageValid,
      disadvantage: isDisadvantageValid,
      comment: isCommentValid,
    });

    return isNameValid && isRatingValid
    && isAdvantageValid && isDisadvantageValid
    && isCommentValid;
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const commentPost = {
      guitarId: guitarData.id,
      userName: userName,
      rating: parseInt(rating, 10),
      advantage: advantage,
      disadvantage: disadvantage,
      comment: comment,
    };

    const onError = (message: string[]) => {
      setIsSubmitting(false);
      setErrorMessages(message);
    };

    onSubmit(commentPost, onError);
  };

  const ratingToFill = useMemo(() => {
    const parsedHoverValue = parseInt(hoverRating, 10) || 0;
    const parsedRatingValue = parseInt(rating, 10) || 0;
    if (parsedHoverValue !== 0 && parsedHoverValue !== parsedRatingValue) {
      return parsedHoverValue;
    }

    return parsedRatingValue;
  }, [rating, hoverRating]);

  return (
    <div className='modal__content'>
      <h2
        className='modal__header modal__header--review title title--medium'
        data-testid='add-review-heading'
      >
        Оставить отзыв
      </h2>
      <h3
        className='modal__product-name title title--medium-20 title--uppercase'
        data-testid='add-review-modal-heading'
      >
        {guitarData.name}
      </h3>
      <form className='form-review' onSubmit={handleFormSubmit}>
        <fieldset disabled={isSubmitting} style={{'padding': '0', 'border': 'none'}}>
          <div className='form-review__wrapper'>
            <div className='form-review__name-wrapper'>
              <label className='form-review__label form-review__label--required' htmlFor='user-name'>Ваше Имя</label>
              <input
                className='form-review__input form-review__input--name'
                id='user-name' type='text' autoComplete='off'
                value={userName} onChange={(event) => setUserName(event.target.value)}
                data-testid='add-review-modal-name-input'
              />

              {!formValidity.userName &&
              <span
                className='form-review__warning'
                data-testid='add-review-modal-name-warning'
              >
                Заполните поле
              </span>}
            </div>
            <div>
              <span className='form-review__label form-review__label--required'>Ваша Оценка</span>
              <div className='rate'>

                {ratingOptions.map((option) => (
                  <Fragment key={option.label}>
                    <input
                      className='visually-hidden' type='radio' id={`star-${option.value}`} name='rate' value={option.value}
                      checked={rating === option.value} onChange={(event) => setRating(event.target.value)}
                      data-testid='add-review-modal-radio-input'
                    />
                    <label
                      className={`rate__label ${(parseInt(option.value, 10) <= ratingToFill) ? 'rate__label--fill' : ''}`} htmlFor={`star-${option.value}`}
                      title={option.label}
                      onMouseEnter={() => setHoverRating(option.value)}
                      onMouseLeave={() => setHoverRating('')}
                    >
                    </ label>
                  </Fragment>
                ))}


                {!formValidity.rating &&
                <span
                  className='rate__message'
                  data-testid='add-review-modal-rating-warning'
                >
                  Поставьте оценку
                </span>}
              </div>
            </div>
          </div>
          <label className='form-review__label form-review__label--required' htmlFor='pros'>Достоинства</label>
          <input
            className='form-review__input' id='pros' type='text' autoComplete='off'
            value={advantage} onChange={(event) => setAdvantage(event.target.value)}
            data-testid='add-review-modal-pros-input'
          />
          {!formValidity.advantage &&
          <span
            className='form-review__warning'
            data-testid='add-review-modal-pros-warning'
          >
            Заполните поле
          </span>}

          <label className='form-review__label form-review__label--required' htmlFor='cons'>Недостатки</label>
          <input
            className='form-review__input' id='cons' type='text' autoComplete='off'
            value={disadvantage} onChange={(event) => setDisadvantage(event.target.value)}
            data-testid='add-review-modal-disadvantage-input'
          />
          {!formValidity.disadvantage &&
          <span
            className='form-review__warning'
            data-testid='add-review-modal-cons-warning'
          >
            Заполните поле
          </span>}

          <label className='form-review__label form-review__label--required' htmlFor='comment'>Комментарий</label>
          <textarea
            className='form-review__input form-review__input--textarea' id='comment' rows={10} autoComplete='off'
            value={comment} onChange={(event) => setComment(event.target.value)}
            data-testid='add-review-modal-comment-input'
          />
          {!formValidity.comment &&
          <span
            className='form-review__warning'
            data-testid='add-review-modal-comment-warning'
          >
            Заполните поле
          </span>}

          <button
            className='button button--medium-20 form-review__button'
            type='submit' data-testid='add-review-modal-submit-button'
          >
            Отправить отзыв
          </button>
          {errorMessages &&
          errorMessages.map((message) => <span key={message} className='form-review__warning'>{message}</span>)}

        </fieldset>
      </form>

      <button
        className='modal__close-btn button-cross'
        type='button'
        aria-label='Закрыть'
        onClick={onModalClose}
      >
        <span className='button-cross__icon'></span>
        <span className='modal__close-btn-interactive-area'></span>
      </button>

    </div>
  );
}

export default memo(AddReviewModal);
