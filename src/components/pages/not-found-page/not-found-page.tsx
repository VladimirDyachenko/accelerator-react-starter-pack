import { AppRoute } from 'const/const';
import { Link } from 'react-router-dom';
import style from './not-found-page.module.css';

function NotFoundPage() {

  return (
    <section className={style.wrapper}>
      <h1 className={style.title}>404</h1>
      <Link to={AppRoute.Home} className={style.link}>На главную</Link>
    </section>
  );
}

export default NotFoundPage;
