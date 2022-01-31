import { memo, useEffect, useMemo, useRef, useState, MouseEvent, RefObject, useCallback } from 'react';
import { Comment, CommentPost } from 'types/types';
import { REVIEWS_PER_STEP } from 'const/const';
import useIntersectionObserver from 'hooks/use-intersection-observer/use-intersection-observer';
import { AddReviewModal, AddReviewSuccessModal, ReviewItem } from '../components';
import { ModalContainer } from 'components/common/common';
import { useDispatch } from 'react-redux';
import { addComment } from 'store/api-actions';

type ReviewsProps = {
  reviews: Comment[],
  pageStart: RefObject<HTMLElement>
  guitarData: { id: number; name: string; }
}

function Reviews({reviews, pageStart, guitarData}: ReviewsProps):JSX.Element {

  const dispatch = useDispatch();
  const [amountToRender, setAmountToRender] = useState(REVIEWS_PER_STEP);
  const isCanRenderMore = useMemo(() => amountToRender < reviews.length, [amountToRender, reviews.length]);
  const reviewsToRender = useMemo(() => reviews.slice(0, amountToRender), [reviews, amountToRender]);
  const ref = useRef<HTMLButtonElement>(null);

  const [entry] = useIntersectionObserver(ref, {rootMargin: '50px'});

  useEffect(() => {
    if (entry && entry.isIntersecting && isCanRenderMore) {
      const showMore = () => {
        if (entry.isIntersecting && isCanRenderMore) {
          setAmountToRender((amount) => amount + REVIEWS_PER_STEP);
        }

        setTimeout(() => {
          const rect = ref.current?.getBoundingClientRect();
          if (rect && (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight + rect.height &&
            rect.right <= window.innerWidth)
          ) {
            showMore();
          }
        }, 1);
      };

      showMore();
    }
  }, [entry, isCanRenderMore]);

  const [openedModal, setOpenedModal] = useState<'addReview' | 'success' | undefined>(undefined);
  const onModalClose = useCallback(() => setOpenedModal(undefined), [setOpenedModal]);

  const handleAddReviewClick = (event: MouseEvent) => {
    event.preventDefault();
    setOpenedModal('addReview');
  };

  const onReviewSubmit = useCallback((comment: CommentPost, onError: (message: string[]) => void) => {
    const onSuccess = () => setOpenedModal('success');

    dispatch(addComment(comment, onSuccess, onError));
  }, [dispatch]);

  const handleUpButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    if (pageStart.current !== null) {
      pageStart.current.scrollIntoView();
    }
  };

  return (
    <>
      <section className='reviews'>
        <h3 className='reviews__title title title--bigger'>Отзывы</h3>

        <a
          className='button button--red-border button--big reviews__sumbit-button'
          href='#temp'
          onClick={handleAddReviewClick}
          data-testid='reviews-button-add'
        >
          Оставить отзыв
        </a>

        {reviewsToRender.length > 0 && reviewsToRender.map((review) => <ReviewItem key={review.id} review={review} />)}
        {reviewsToRender.length === 0 && <p>Отзывов еще нет</p>}

        {isCanRenderMore &&
        <button
          ref={ref}
          className='button button--medium reviews__more-button'
          onClick={() => setAmountToRender((amount) => amount + REVIEWS_PER_STEP)}
          data-testid='reviews-button-load-more'
        >
          Показать еще отзывы
        </button>}

        <a
          className='button button--up button--red-border button--big reviews__up-button'
          onClick={handleUpButtonClick}
          href='#header'
          data-testid='reviews-button-up'
        >
          Наверх
        </a>
      </section>

      <ModalContainer
        modalName={openedModal}
        onModalClose={onModalClose}
        wrapperClassName={`${openedModal === 'addReview' ? 'modal--review' : 'modal--success'}`}
      >

        {openedModal === 'addReview' &&
        <AddReviewModal
          guitarData={guitarData}
          onSubmit={(comment, onError) => onReviewSubmit(comment, onError)}
          onModalClose={onModalClose}
        />}

        {openedModal === 'success' && <AddReviewSuccessModal onModalClose={onModalClose} />}
      </ModalContainer>
    </>
  );
}

export default memo(Reviews);
