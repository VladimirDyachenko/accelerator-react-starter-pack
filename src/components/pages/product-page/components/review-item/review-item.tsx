import { memo } from 'react';

function ReviewItem(): JSX.Element {
  return (
    <div className='review'>
      <div className='review__wrapper'>
        <h4 className='review__title review__title--author title title--lesser'>
          Преображенская Ксения
        </h4>
        <span className='review__date'>12 декабря</span>
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
        Хороший корпус, чистый звук, стурны хорошего качества
      </p>
      <h4 className='review__title title title--lesser'>Недостатки:</h4>
      <p className='review__value'>Тугие колонки</p>
      <h4 className='review__title title title--lesser'>
        Комментарий:
      </h4>
      <p className='review__value'>
        У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте
        неть чехла и ремня. У гитары отличный цвет, хороше дерево.
        Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный
        цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У
        гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть
        чехла и ремня.{' '}
      </p>
    </div>
  );
}

export default memo(ReviewItem);
