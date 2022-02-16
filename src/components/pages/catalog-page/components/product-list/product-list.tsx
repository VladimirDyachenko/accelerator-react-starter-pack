
import { Spinner } from 'components/common/common';
import { useSelector } from 'react-redux';
import { getGuitarList, getLoadingStatus } from 'store/catalog-process/selectors';
import { ProductCard } from '../components';
import useAddToCart from 'hooks/use-add-to-cart/use-add-to-cart';
import { getProductIdsInCart } from 'store/cart-process/selectors';

function ProductList(): JSX.Element {
  const guitarList = useSelector(getGuitarList);
  const { isLoading, isError } = useSelector(getLoadingStatus);
  const { onAddToCart, modal } = useAddToCart();
  const productInCartIds = useSelector(getProductIdsInCart);

  if (isLoading && guitarList.length === 0) {
    return (
      <div style={{'margin': '25% auto'}}>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (<p>Ошибка загрузки</p>);
  }

  if (!isLoading && !isError && guitarList.length === 0) {
    return (<p>Нет подходящих товаров, попробуйте изменить фильтр</p>);
  }

  return (
    <div
      className='cards catalog__cards'
      data-testid='products-list-wrapper'
      style={{'opacity': isLoading && guitarList.length !== 0 ? 0.7 : 1 }}
    >

      {guitarList
        .map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            isInCart={productInCartIds[product.id] !== undefined}
          />))}

      {modal}
    </div>
  );
}

export default ProductList;
