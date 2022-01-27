import { GuitarTypeDict, TabOption } from 'const/const';
import { memo } from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import { Guitar } from 'types/types';

type TabsProps = {
  product: Guitar;
}

function Tabs({product}: TabsProps): JSX.Element {
  const location = useLocation();

  if (location.hash !== TabOption.Characteristics && location.hash !== TabOption.Description) {
    return (
      <Redirect to={{...location, hash: TabOption.Characteristics}}/>
    );
  }

  return (
    <div className='tabs'>
      <NavLink
        className='button button--medium tabs__button'
        activeClassName='button--black-border'
        to={{hash: TabOption.Characteristics}}
        isActive={(_, { hash }) => hash === TabOption.Characteristics}
        data-testid='tabs-link-characteristics'
      >
        Характеристики
      </NavLink>
      <NavLink
        className='button button--medium tabs__button'
        activeClassName='button--black-border'
        to={{hash: '#description'}}
        isActive={(_, { hash }) => hash === TabOption.Description}
        data-testid='tabs-link-description'
      >
        Описание
      </NavLink>
      <div className='tabs__content' id='characteristics'>
        <table className={`tabs__table ${location.hash === TabOption.Characteristics ? '' : 'hidden'}`}>
          <tbody>
            <tr className='tabs__table-row'>
              <td className='tabs__title'>Артикул:</td>
              <td className='tabs__value'>{product.vendorCode}</td>
            </tr>
            <tr className='tabs__table-row'>
              <td className='tabs__title'>Тип:</td>
              <td className='tabs__value'>{GuitarTypeDict[product.type]}</td>
            </tr>
            <tr className='tabs__table-row'>
              <td className='tabs__title'>Количество струн:</td>
              <td className='tabs__value'>{product.stringCount} струнная</td>
            </tr>

          </tbody>
        </table>
        <p
          className={`tabs__product-description ${location.hash === TabOption.Description ? '' : 'hidden'}`}
          data-testid='tabs-description-text'
        >
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default memo(Tabs);
