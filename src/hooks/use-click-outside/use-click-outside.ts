import { MutableRefObject, useEffect, useRef } from 'react';

function useClickOutside(
  elementRef: MutableRefObject<HTMLElement | null>,
  callback: (e: MouseEvent) => void,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!elementRef?.current?.contains((e.target as Node | null)) && callbackRef.current) {
        callbackRef.current(e);
      }
    };
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [elementRef, callbackRef]);
}

export default useClickOutside;
