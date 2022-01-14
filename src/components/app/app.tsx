import CartPage from 'components/pages/cart-page/cart-page';
import CatalogPage from 'components/pages/catalog-page/catalog-page';
import ProductPage from 'components/pages/product-page/product-page';
import { AppRoute } from 'const/const';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Switch>
      <Route
        path={`${AppRoute.Catalog}/:page?`}
        exact
      >
        <CatalogPage />
      </Route>
      <Route path={AppRoute.Cart} exact>
        <CartPage />
      </Route>
      <Route path={`${AppRoute.Product}/:id`} exact>
        <ProductPage />
      </Route>
      <Route path={AppRoute.Home} exact>
        <Redirect to={`${AppRoute.Catalog}/1`}/>
      </Route>
      <Route path=''>
        <h2><Link to={AppRoute.Catalog}>404</Link></h2>
      </Route>
    </Switch>
  );
}

export default App;
