import { RefObject, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLFormElement>,
  onClose: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
        e.preventDefault();
        onClose();
      }
    };

    if (ref.current) {
      document.addEventListener('click', handleClickOutside, true);

      (
        ref.current.querySelectorAll('input, select')?.[0] as
          | HTMLInputElement
          | HTMLSelectElement
      )?.focus();
    }

    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, [onClose, ref]);
};

export default useClickOutside;
