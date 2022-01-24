import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductData } from 'store/api-actions';
import { getProductData } from 'store/product-process/selectors';
import { AppRoute, HttpCode } from 'const/const';
import { Breadcrumbs, Footer, Header } from 'components/common/common';
import { ProductCard, Reviews } from './components/components';

function ProductPage(): JSX.Element {
  const { id } = useParams<{id: string}>();
  const dispatch = useDispatch();
  const productData = useSelector(getProductData);
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const productId = useMemo(() => parseInt(id, 10), [id]);

  useEffect(() => {

    if (isNaN(productId)) {
      history.replace('/page-404');
      return;
    }

    const onLoadError = (code: number) => {
      setIsError(true);
      if (code === HttpCode.NotFound) {
        // без таймаута происходит обновление стэйта unmounted компонента, что приводит к ошибке
        setTimeout(() => history.replace('/page-404'), 1);
      }
    };

    dispatch(fetchProductData(productId, onLoadError));
  }, [productId, dispatch, history]);

  const productName = productData?.name || '';

  if (isError) {
    return (
      <div className='wrapper'>
        <Header />
        <main className='page-content'>
          <div className='container'>
            <p style={{'textAlign': 'center', 'marginTop': '10%'}}>Ошибка загрузки</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='wrapper'>
      <Header />

      <main className='page-content'>
        {productData && productData.id === productId &&
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
          <ProductCard product={productData}/>
          <Reviews />
        </div>}
      </main>

      <Footer />
    </div>
  );
}

export default ProductPage;
