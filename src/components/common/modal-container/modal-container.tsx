import { memo, PropsWithChildren, useEffect } from 'react';

type ModalContainerProps = PropsWithChildren<{
  isModalOpen: boolean;
  wrapperClassName?: string;
  onModalClose: () => void;
}>

function ModalContainer({isModalOpen, wrapperClassName, onModalClose, children}: ModalContainerProps): JSX.Element {
  // Закрытие по нажатию Escape и выключение скролла
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onModalClose();
      }
    };
    if (isModalOpen) {
      document.querySelector('body')?.classList.add('scroll-lock-ios', 'scroll-lock');
      window.addEventListener('keydown', handleKeydown);
    }

    return () => {
      document.querySelector('body')?.classList.remove('scroll-lock-ios', 'scroll-lock');
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onModalClose, isModalOpen]);

  // Ловушка фокуса
  useEffect(() => {
    const modalElement = document.querySelector('.modal');
    const focusableElementsInModal = modalElement?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    const handleFocusEvent = (event: FocusEvent) => {
      if (event.target === modalElement) {
        return;
      }

      if (modalElement?.contains(event.target as Node) || focusableElementsInModal === undefined) {
        return;
      }

      (focusableElementsInModal[0] as HTMLElement).focus();
    };

    if (isModalOpen) {
      document.addEventListener('focusin', handleFocusEvent);
    }

    return () => {
      document.removeEventListener('focusin', handleFocusEvent);
    };

  }, [isModalOpen]);

  return (
    <div className={`modal ${isModalOpen ? 'is-active' : ''} ${wrapperClassName ?? ''}`} >
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onModalClose} />
        {children}
      </div>
    </div>
  );
}

export default memo(ModalContainer);
