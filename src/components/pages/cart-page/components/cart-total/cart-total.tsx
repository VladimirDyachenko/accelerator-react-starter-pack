import { formatPrice } from 'const/const';
import { memo } from 'react';

export type CartTotalProps = {
  total: number;
  discount: number;
}

function CartTotal({total, discount}: CartTotalProps) {
  return (
    <div className='cart__total-info'>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>Всего:</span>
        <span className='cart__total-value'>{formatPrice(total)} ₽</span>
      </p>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>Скидка:</span>
        {discount === 0 ?
          (
            <span className='cart__total-value'>
              {formatPrice(discount)} ₽
            </span>
          ) :
          (
            <span className='cart__total-value cart__total-value--bonus'>
              - {formatPrice(discount)} ₽
            </span>
          )}
      </p>
      <p className='cart__total-item'>
        <span className='cart__total-value-name'>К оплате:</span>
        <span className='cart__total-value cart__total-value--payment'>
          {formatPrice(total - discount)} ₽
        </span>
      </p>
      <button className='button button--red button--big cart__order-button'>
        Оформить заказ
      </button>
    </div>
  );
}

export default memo(CartTotal);
