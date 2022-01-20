
import { Spinner } from 'components/common/common';
import { useSelector } from 'react-redux';
import { getGuitarList, getLoadingStatus } from 'store/catalog-process/selectors';
import { ProductCard } from '../components';

function ProductList(): JSX.Element {
  const guitarList = useSelector(getGuitarList);
  const { isLoading, isError } = useSelector(getLoadingStatus);

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
        .map((product) => <ProductCard key={product.id} product={product}/>)}
    </div>
  );
}

export default ProductList;
