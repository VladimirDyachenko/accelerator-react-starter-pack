import { Breadcrumbs, Footer, Header, Paginator } from 'components/common/common';
import { AppRoute } from 'const/const';
import { ProductList, Filter, Sort } from './components/components';

function CatalogPage(): JSX.Element {
  return (
    <div className='wrapper'>
      <Header />
      <main className='page-content'>
        <div className='container'>
          <h1 className='page-content__title title title--bigger'>
            Каталог гитар
          </h1>
          <Breadcrumbs
            items={
              [
                {label: 'Главная', to: AppRoute.Home},
                {label: 'Каталог', to: AppRoute.Catalog},
              ]
            }
          />
          <div className='catalog'>
            <Filter />
            <Sort />
            <ProductList />
            <Paginator />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
