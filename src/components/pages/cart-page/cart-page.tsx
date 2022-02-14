import { Breadcrumbs, CouponForm, Footer, Header } from 'components/common/common';
import { AppRoute } from 'const/const';
import { CartItem, CartTotal } from './components/components';

function CartPage(): JSX.Element {

  return (
    <div className='wrapper'>
      <Header />

      <main className='page-content'>
        <div className='container'>
          <h1 className='title title--bigger page-content__title'>Корзина</h1>

          <Breadcrumbs
            items={
              [
                {
                  label: 'Главная',
                  to: AppRoute.Home,
                },
                {
                  label: 'Каталог',
                  to: AppRoute.Catalog,
                },
                {
                  label: 'Корзина',
                  to: AppRoute.Cart,
                },
              ]
            }
          />

          <div className='cart'>
            <CartItem />
            <CartItem />

            <div className='cart__footer'>
              <CouponForm containerClassName='cart__coupon'/>
              <CartTotal />
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default CartPage;
