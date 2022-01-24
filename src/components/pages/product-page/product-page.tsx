import { Breadcrumbs, Footer, Header } from 'components/common/common';
import { AppRoute } from 'const/const';
import { useParams } from 'react-router-dom';
import { ProductCard, Reviews } from './components/components';

function ProductPage(): JSX.Element {
  const { id } = useParams<{id: string}>();
  const productName = `Временное название гитары 666 ${id}`;

  return (
    <div className='wrapper'>
      <Header />

      <main className='page-content'>
        <div className='container'>
          <h1 className='page-content__title title title--bigger'>{productName}</h1>
          <Breadcrumbs
            items={
              [
                {label: 'Главная', to: AppRoute.Home},
                {label: 'Каталог', to: `${AppRoute.Catalog}/1`},
                {label: productName, to: `${AppRoute.Product}/${id}`},
              ]
            }
          />
          <ProductCard />
          <Reviews />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductPage;
