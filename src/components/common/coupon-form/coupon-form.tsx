import { ChangeEvent, FormEvent, memo, useState } from 'react';
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

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (coupon !== undefined) {
      dispatch(applyCoupon(coupon.toLowerCase(), () => setIsError(true)));
    }
  };

  const handleCouponChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

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
          />
          {currentCoupon !== null &&
          <p className='form-input__message form-input__message--success'>
            Промокод принят
          </p>}
          {isError && currentCoupon === null &&
          <p className='form-input__message form-input__message--error'>
            Неверный промокод
          </p>}
        </div>
        <button type='submit' className='button button--big coupon__button'>
          Применить
        </button>
      </form>
    </div>
  );
}

export default memo(CouponForm);
