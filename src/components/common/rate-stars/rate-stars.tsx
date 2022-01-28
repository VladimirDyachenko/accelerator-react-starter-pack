import { ratingOptions } from 'const/const';
import { memo, useMemo } from 'react';

type RateStarsProps = {
  size: { width: number; height: number };
  rating: number;
  rateCount?: number;
  rateMessage?: string;
  additionalContainerClassName: string;
}

function RateStars(props: RateStarsProps) {
  const {
    size,
    rating,
    rateCount,
    rateMessage,
    additionalContainerClassName,
  } = props;

  const stars = useMemo(() => new Array(ratingOptions.length)
    .fill(undefined)
    .map((_, index) => index + 1)
  , []);

  return (
    <div
      className={`rate ${additionalContainerClassName ?? ''}`} aria-hidden='true'
      data-testid='rate-stars-wrapper'
    >
      <span className='visually-hidden'>Рейтинг:</span>
      {stars.map((value) => (
        <svg key={value} width={size.width} height={size.height} aria-hidden='true'>
          <use xlinkHref={rating >= value ? '#icon-full-star' : '#icon-star'} />
        </svg>
      ))}
      <span className='rate__count' data-testid='rate-stars-count'>{rateCount}</span>
      <span className='rate__message'>{rateMessage ?? ''}</span>
    </div>
  );
}

export default memo(RateStars);
