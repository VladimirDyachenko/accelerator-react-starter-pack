import { Breadcrumbs, Footer, Header } from 'components/common/common';
import { AppRoute } from 'const/const';
import { Cart } from './components/components';

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

          <Cart/>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default CartPage;
