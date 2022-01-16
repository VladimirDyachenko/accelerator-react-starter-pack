import CartPage from 'components/pages/cart-page/cart-page';
import CatalogPage from 'components/pages/catalog-page/catalog-page';
import NotFoundPage from 'components/pages/not-found-page/not-found-page';
import ProductPage from 'components/pages/product-page/product-page';
import { AppRoute } from 'const/const';
import { Redirect, Route, Switch } from 'react-router-dom';

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
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default App;
