import { REVIEWS_PER_STEP } from 'const/const';
import React, { memo, useMemo, useState } from 'react';
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

  const [amountToRender, setAmountToRender] = useState(REVIEWS_PER_STEP);
  const isCanRenderMore = useMemo(() => amountToRender < reviews.length, [amountToRender, reviews.length]);
  const reviewToRender = useMemo(() => reviews.slice(0, amountToRender), [reviews, amountToRender]);

  return (
    <section className='reviews'>
      <h3 className='reviews__title title title--bigger'>Отзывы</h3>

      <a
        className='button button--red-border button--big reviews__sumbit-button'
        href='#temp'
      >
        Оставить отзыв
      </a>

      {reviewToRender.length > 0 && reviewToRender.map((review) => <ReviewItem key={review.id} review={review} />)}
      {reviewToRender.length === 0 && <p>Отзывов еще нет</p>}

      {isCanRenderMore &&
      <button
        className='button button--medium reviews__more-button'
        onClick={() => setAmountToRender((amount) => amount + REVIEWS_PER_STEP)}
      >
        Показать еще отзывы
      </button>}

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
