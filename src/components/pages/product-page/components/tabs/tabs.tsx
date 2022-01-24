import { TabOption } from 'const/const';
import { memo } from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';

function Tabs(): JSX.Element {
  const location = useLocation();

  if (location.hash !== TabOption.Characteristics && location.hash !== TabOption.Description) {
    return (
      <Redirect to={{...location, hash: '#characteristics'}}/>
    );
  }

  return (
    <div className='tabs'>
      <NavLink
        className='button button--medium tabs__button'
        activeClassName='button--black-border'
        to={{hash: '#characteristics'}}
        isActive={(_, { hash }) => hash === TabOption.Characteristics}
      >
        Характеристики
      </NavLink>
      <NavLink
        className='button button--medium tabs__button'
        activeClassName='button--black-border'
        to={{hash: '#description'}}
        isActive={(_, { hash }) => hash === TabOption.Description}
      >
        Описание
      </NavLink>
      <div className='tabs__content' id='characteristics'>
        <table className={`tabs__table ${location.hash === TabOption.Characteristics ? '' : 'hidden'}`}>
          <tbody>
            <tr className='tabs__table-row'>
              <td className='tabs__title'>Артикул:</td>
              <td className='tabs__value'>SO754565</td>
            </tr>
            <tr className='tabs__table-row'>
              <td className='tabs__title'>Тип:</td>
              <td className='tabs__value'>Электрогитара</td>
            </tr>
            <tr className='tabs__table-row'>
              <td className='tabs__title'>Количество струн:</td>
              <td className='tabs__value'>6 струнная</td>
            </tr>

          </tbody>
        </table>
        <p className={`tabs__product-description ${location.hash === TabOption.Description ? '' : 'hidden'}`}>
          Гитара подходит как для старта обучения, так и для домашних
          занятий или использования в полевых условиях, например, в
          походах или для проведения уличных выступлений. Доступная
          стоимость, качество и надежная конструкция, а также приятный
          внешний вид, который сделает вас звездой вечеринки.
        </p>
      </div>
    </div>
  );
}

export default memo(Tabs);
