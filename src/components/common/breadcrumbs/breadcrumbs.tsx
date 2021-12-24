import { Link } from 'react-router-dom';

type BreadcrumbsProps = {
  items: Array<{
    label: string,
    to: string,
  }>
}

function Breadcrumbs({items}: BreadcrumbsProps): JSX.Element {
  return (
    <ul className='breadcrumbs page-content__breadcrumbs'>
      {items.map((link) => (
        <li key={link.label} className='breadcrumbs__item'>
          <Link to={link.to}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Breadcrumbs;
