import { memo } from 'react';
import { Comment } from 'types/types';
import { RateStars } from 'components/common/common';

type ReviewItemProps = {
  review: Comment;
}

function ReviewItem({review}: ReviewItemProps): JSX.Element {
  return (
    <div className='review'>
      <div className='review__wrapper'>
        <h4
          className='review__title review__title--author title title--lesser'
          data-testid='review-item-heading'
        >
          {review.userName}
        </h4>
        <span className='review__date'>{new Date(review.createAt).toLocaleDateString('ru-RU', {month: 'long', day: '2-digit'})}</span>
      </div>

      <RateStars
        size={{width: 16, height: 16}}
        rating={review.rating}
        additionalContainerClassName='review__rating-panel'
      />

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
