import { useSelector } from 'react-redux';
import { getGuitarList } from 'store/catalog-process/selectors';
import { Guitar } from 'types/types';
import { ProductCard } from '../components';

function ProductList(): JSX.Element {
  const guitarList = useSelector(getGuitarList);

  return (
    <div className='cards catalog__cards'>
      {guitarList.map((product) => <ProductCard key={product.id} product={product as Guitar}/>)}
    </div>
  );
}

export default ProductList;
