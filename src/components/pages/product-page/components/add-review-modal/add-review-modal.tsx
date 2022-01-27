import { FormEvent, memo, useState } from 'react';
import { CommentPost } from 'types/types';

type AddReviewModalProps = {
  guitarData: {id: number, name: string};
  onSubmit: (comment: CommentPost, onError: (message: string[]) => void) => void;
  onModalClose: () => void;
};

function AddReviewModal({guitarData, onSubmit, onModalClose}: AddReviewModalProps) {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState('');
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

  return (
    <div className='modal__content'>
      <h2 className='modal__header modal__header--review title title--medium'>Оставить отзыв</h2>
      <h3 className='modal__product-name title title--medium-20 title--uppercase'>{guitarData.name}</h3>
      <form className='form-review' onSubmit={handleFormSubmit}>
        <fieldset disabled={isSubmitting} style={{'padding': '0', 'border': 'none'}}>
          <div className='form-review__wrapper'>
            <div className='form-review__name-wrapper'>
              <label className='form-review__label form-review__label--required' htmlFor='user-name'>Ваше Имя</label>
              <input
                className='form-review__input form-review__input--name'
                id='user-name' type='text' autoComplete='off'
                value={userName} onChange={(event) => setUserName(event.target.value)}
              />

              {!formValidity.userName && <span className='form-review__warning'>Заполните поле</span>}
            </div>
            <div>
              <span className='form-review__label form-review__label--required'>Ваша Оценка</span>
              <div className='rate rate--reverse'>

                <input
                  className='visually-hidden' type='radio' id='star-5' name='rate' value='5'
                  checked={rating === '5'} onChange={(event) => setRating(event.target.value)}
                />
                <label className='rate__label' htmlFor='star-5' title='Отлично'></label>

                <input
                  className='visually-hidden' type='radio' id='star-4' name='rate' value='4'
                  checked={rating === '4'} onChange={(event) => setRating(event.target.value)}
                />
                <label className='rate__label' htmlFor='star-4' title='Хорошо'></label>

                <input
                  className='visually-hidden' type='radio' id='star-3' name='rate' value='3'
                  checked={rating === '3'} onChange={(event) => setRating(event.target.value)}
                />
                <label className='rate__label' htmlFor='star-3' title='Нормально'></label>

                <input
                  className='visually-hidden' type='radio' id='star-2' name='rate' value='2'
                  checked={rating === '2'} onChange={(event) => setRating(event.target.value)}
                />
                <label className='rate__label' htmlFor='star-2' title='Плохо'></label>

                <input
                  className='visually-hidden' type='radio' id='star-1' name='rate' value='1'
                  checked={rating === '1'} onChange={(event) => setRating(event.target.value)}
                />
                <label className='rate__label' htmlFor='star-1' title='Ужасно'></label>
                <span className='rate__count'></span>

                {!formValidity.rating && <span className='rate__message'>Поставьте оценку</span>}
              </div>
            </div>
          </div>
          <label className='form-review__label form-review__label--required' htmlFor='pros'>Достоинства</label>
          <input
            className='form-review__input' id='pros' type='text' autoComplete='off'
            value={advantage} onChange={(event) => setAdvantage(event.target.value)}
          />
          {!formValidity.advantage && <span className='form-review__warning'>Заполните поле</span>}

          <label className='form-review__label form-review__label--required' htmlFor='cons'>Недостатки</label>
          <input
            className='form-review__input' id='cons' type='text' autoComplete='off'
            value={disadvantage} onChange={(event) => setDisadvantage(event.target.value)}
          />
          {!formValidity.disadvantage && <span className='form-review__warning'>Заполните поле</span>}

          <label className='form-review__label form-review__label--required' htmlFor='comment'>Комментарий</label>
          <textarea
            className='form-review__input form-review__input--textarea' id='comment' rows={10} autoComplete='off'
            value={comment} onChange={(event) => setComment(event.target.value)}
          />
          {!formValidity.comment && <span className='form-review__warning'>Заполните поле</span>}

          <button
            className='button button--medium-20 form-review__button'
            type='submit'
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
