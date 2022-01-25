import React, { memo } from 'react';
import { Comment } from 'types/types';
import { ReviewItem } from '../components';

type ReviewsProps = {
  reviews: Comment[],
  pageStart: React.RefObject<HTMLElement>
}

function Reviews({reviews, pageStart}: ReviewsProps):JSX.Element {

  const handleUpButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (pageStart.current !== null) {
      pageStart.current.scrollIntoView();
    }
  };

  return (
    <section className='reviews'>
      <h3 className='reviews__title title title--bigger'>Отзывы</h3>

      <a
        className='button button--red-border button--big reviews__sumbit-button'
        href='#temp'
      >
        Оставить отзыв
      </a>

      {reviews.map((review) => <ReviewItem key={review.id} review={review} />)}

      <button className='button button--medium reviews__more-button'>
        Показать еще отзывы
      </button>

      <a
        className='button button--up button--red-border button--big reviews__up-button'
        onClick={handleUpButtonClick}
        href='#header'
      >
        Наверх
      </a>
    </section>
  );
}

export default memo(Reviews);
