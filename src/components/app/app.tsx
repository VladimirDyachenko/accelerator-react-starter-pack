import CartPage from 'components/pages/cart-page/cart-page';
import CatalogPage from 'components/pages/catalog-page/catalog-page';
import ProductPage from 'components/pages/product-page/product-page';
import { AppRoute } from 'const/const';
import { Route, Switch } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Switch>
      <Route path={[AppRoute.Home, AppRoute.Catalog]} exact>
        <CatalogPage />
      </Route>
      <Route path={AppRoute.Cart} exact>
        <CartPage />
      </Route>
      <Route path={`${AppRoute.Product}/:id`} exact>
        <ProductPage />
      </Route>
      <Route path=''>
        <h2>404</h2>
      </Route>
    </Switch>
  );
}

export default App;
