import style from './spinner.module.css';

function Spinner() {
  return (
    <>
      <p className='visually-hidden' data-testid='hidden-text'>Загрузка...</p>
      <div className={style.spinner}></div>
    </>
  );
}

export default Spinner;
