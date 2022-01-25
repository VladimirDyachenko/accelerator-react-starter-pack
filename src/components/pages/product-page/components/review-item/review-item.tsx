import { memo } from 'react';
import { Comment } from 'types/types';

type ReviewItemProps = {
  review: Comment;
}

function ReviewItem({review}: ReviewItemProps): JSX.Element {
  return (
    <div className='review'>
      <div className='review__wrapper'>
        <h4 className='review__title review__title--author title title--lesser'>
          {review.userName}
        </h4>
        <span className='review__date'>{new Date(review.createAt).toLocaleDateString('ru-RU', {month: 'long', day: '2-digit'})}</span>
      </div>
      <div className='rate review__rating-panel' aria-hidden='true'>
        <span className='visually-hidden'>Рейтинг:</span>
        <svg width='16' height='16' aria-hidden='true'>
          <use xlinkHref='#icon-full-star'></use>
        </svg>
        <svg width='16' height='16' aria-hidden='true'>
          <use xlinkHref='#icon-full-star'></use>
        </svg>
        <svg width='16' height='16' aria-hidden='true'>
          <use xlinkHref='#icon-full-star'></use>
        </svg>
        <svg width='16' height='16' aria-hidden='true'>
          <use xlinkHref='#icon-full-star'></use>
        </svg>
        <svg width='16' height='16' aria-hidden='true'>
          <use xlinkHref='#icon-star'></use>
        </svg>
        <span className='rate__count'></span>
        <span className='rate__message'></span>
      </div>
      <h4 className='review__title title title--lesser'>
        Достоинства:
      </h4>
      <p className='review__value'>
        {review.advantage}
      </p>
      <h4 className='review__title title title--lesser'>Недостатки:</h4>
      <p className='review__value'>{review.disadvantage}</p>
      <h4 className='review__title title title--lesser'>
        Комментарий:
      </h4>
      <p className='review__value'>
        {review.comment}
      </p>
    </div>
  );
}

export default memo(ReviewItem);
