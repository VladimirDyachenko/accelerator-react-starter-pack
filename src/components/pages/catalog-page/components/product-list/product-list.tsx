import guitarList from 'mock/guitars.json';
import { Guitar } from 'types/guitars';
import { ProductCard } from '../components';

function ProductList(): JSX.Element {
  return (
    <div className='cards catalog__cards'>
      {guitarList.map((product) => <ProductCard key={product.id} product={product as Guitar}/>)}
    </div>
  );
}

export default ProductList;
