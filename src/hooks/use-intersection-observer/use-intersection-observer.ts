import { RefObject, useEffect, useRef, useState } from 'react';

function useIntersectionObserver(
  elementRef: RefObject<HTMLElement | null>,
  { root = null, rootMargin, threshold = 0 }: IntersectionObserverInit,
):  [IntersectionObserverEntry | undefined] {

  const [entry, updateEntry] = useState<IntersectionObserverEntry>();
  const observer = useRef<IntersectionObserver | null>(null);

  if (window.IntersectionObserver) {
    observer.current = new IntersectionObserver(
      ([newEntry]) => updateEntry(newEntry),
      {root, rootMargin, threshold},
    );
  }

  useEffect(() => {
    const observerInstance = observer.current;
    if (elementRef.current && observerInstance) {
      observerInstance.observe(elementRef.current);
    }

    return () => observerInstance?.disconnect();
  }, [elementRef]);

  return [entry];
}

export default useIntersectionObserver;
