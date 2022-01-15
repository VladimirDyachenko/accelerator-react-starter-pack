import { useSelector } from 'react-redux';
import { getGuitarList } from 'store/catalog-process/selectors';
import { ProductCard } from '../components';

function ProductList(): JSX.Element {
  const guitarList = useSelector(getGuitarList);

  return (
    <div
      className='cards catalog__cards'
      data-testid='products-list-wrapper'
    >
      {guitarList
        .map((product) => <ProductCard key={product.id} product={product}/>)}
    </div>
  );
}

export default ProductList;
