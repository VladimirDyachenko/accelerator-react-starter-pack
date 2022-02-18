import { ChangeEvent, FormEvent, memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { applyCoupon } from 'store/api-actions';

type CouponFormProps = {
  containerClassName: string;
  currentCoupon: string | null;
}

function CouponForm({ containerClassName, currentCoupon }: CouponFormProps) {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState(currentCoupon || '');
  const [isError, setIsError] = useState(false);
  const [isCouponValid, setIsCouponValid] = useState(true);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (coupon !== undefined) {
      dispatch(applyCoupon(coupon.toLowerCase(), () => setIsError(true)));
    }
  };

  const handleCouponChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value.trim().toLowerCase());
  };

  useEffect(() => {
    if (coupon.split(' ').length > 1) {
      setIsCouponValid(false);
      return;
    }

    setIsCouponValid(true);
  },[coupon]);

  return (
    <div className={`${containerClassName} coupon`}>
      <h2 className='title title--little coupon__title'>
        Промокод на скидку
      </h2>
      <p className='coupon__info'>
        Введите свой промокод, если он у вас есть.
      </p>
      <form
        className='coupon__form'
        id='coupon-form'
        method='post'
        action='/'
        onSubmit={handleFormSubmit}
      >
        <div className='form-input coupon__input'>
          <label className='visually-hidden'>Промокод</label>
          <input
            type='text'
            placeholder='Введите промокод'
            id='coupon'
            name='coupon'
            value={coupon}
            onChange={handleCouponChange}
            data-testid='coupon-input'
          />
          {currentCoupon !== null && isCouponValid && currentCoupon === coupon &&
          <p
            className='form-input__message form-input__message--success'
            data-testid='coupon-form-success'
          >
            Промокод принят
          </p>}
          {((isError && currentCoupon === null) || !isCouponValid) &&
          <p
            className='form-input__message form-input__message--error'
            data-testid='coupon-form-error'
          >
            Неверный промокод
          </p>}
        </div>
        <button
          type='submit' className='button button--big coupon__button'
          disabled={!isCouponValid} data-testid='coupon-submit'
        >
          Применить
        </button>
      </form>
    </div>
  );
}

export default memo(CouponForm);
