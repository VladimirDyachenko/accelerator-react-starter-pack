import { memo } from 'react';

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


  return (
    <div className={`rate ${additionalContainerClassName ?? ''} `} aria-hidden='true'>
      <span className='visually-hidden'>Рейтинг:</span>
      <svg width={size.width} height={size.height} aria-hidden='true'>
        <use xlinkHref={rating >= 1 ? '#icon-full-star' : '#icon-star'} />
      </svg>
      <svg width={size.width} height={size.height} aria-hidden='true'>
        <use xlinkHref={rating >= 2 ? '#icon-full-star' : '#icon-star'} />
      </svg>
      <svg width={size.width} height={size.height} aria-hidden='true'>
        <use xlinkHref={rating >= 3 ? '#icon-full-star' : '#icon-star'} />
      </svg>
      <svg width={size.width} height={size.height} aria-hidden='true'>
        <use xlinkHref={rating >= 4 ? '#icon-full-star' : '#icon-star'} />
      </svg>
      <svg width={size.width} height={size.height} aria-hidden='true'>
        <use xlinkHref={rating >= 5 ? '#icon-full-star' : '#icon-star'} />
      </svg>
      <span className='rate__count' data-testid='rate-stars-count'>{rateCount}</span>
      <span className='rate__message'>{rateMessage ?? ''}</span>
    </div>
  );
}

export default memo(RateStars);
