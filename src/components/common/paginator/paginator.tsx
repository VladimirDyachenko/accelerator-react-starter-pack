import { AppRoute } from 'const/const';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

type PaginatorProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

function Paginator({currentPage, totalItems, itemsPerPage}: PaginatorProps): JSX.Element {
  const totalPages = useMemo(() =>
    new Array(Math.ceil(totalItems / itemsPerPage) || 1)
      .fill(undefined)
      .map((_, index) => index + 1)
  , [totalItems, itemsPerPage]);

  const [isCanGoBack, isCanGoForward] = useMemo(() => [currentPage - 1 > 0, currentPage + 1 <= totalPages.length], [totalPages, currentPage]);

  return (
    <div className='pagination page-content__pagination'>
      <ul className='pagination__list'>
        {isCanGoBack &&
        <li
          className='pagination__page pagination__page--prev'
          id='prev'
        >
          <Link
            className='link pagination__page-link'
            to={`${AppRoute.Catalog}/${currentPage - 1}`}
            data-testid='prev'
          >
            Назад
          </Link>
        </li>}

        {totalPages.map((pageNumber) => (
          <li key={pageNumber}
            className={`pagination__page ${pageNumber === currentPage ? 'pagination__page--active' : ''}`}
          >
            <Link
              className='link pagination__page-link'
              to={`${AppRoute.Catalog}/${pageNumber}`}
              data-testid='page-link'
            >
              {pageNumber}
            </Link>
          </li>
        ))}

        {isCanGoForward &&
        <li
          className='pagination__page pagination__page--next'
          id='next'
        >
          <Link
            className='link pagination__page-link'
            to={`${AppRoute.Catalog}/${currentPage + 1}`}
            data-testid='next'
          >
            Далее
          </Link>
        </li>}
      </ul>
    </div>
  );
}

export default Paginator;
