import { REVIEWS_PER_STEP } from 'const/const';
import useIntersectionObserver from 'hooks/use-intersection-observer/use-intersection-observer';
import { memo, useEffect, useMemo, useRef, useState, MouseEvent, RefObject } from 'react';
import { Comment } from 'types/types';
import { ReviewItem } from '../components';

type ReviewsProps = {
  reviews: Comment[],
  pageStart: RefObject<HTMLElement>
}

function Reviews({reviews, pageStart}: ReviewsProps):JSX.Element {

  const handleUpButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    if (pageStart.current !== null) {
      pageStart.current.scrollIntoView();
    }
  };

  const [amountToRender, setAmountToRender] = useState(REVIEWS_PER_STEP);
  const isCanRenderMore = useMemo(() => amountToRender < reviews.length, [amountToRender, reviews.length]);
  const reviewToRender = useMemo(() => reviews.slice(0, amountToRender), [reviews, amountToRender]);
  const ref = useRef<HTMLButtonElement>(null);

  const [entry] = useIntersectionObserver(ref, {rootMargin: '50px'});

  useEffect(() => {
    if (entry && entry.isIntersecting && isCanRenderMore) {
      setAmountToRender((amount) => amount + REVIEWS_PER_STEP);
    }
  }, [entry, isCanRenderMore]);

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
        ref={ref}
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
