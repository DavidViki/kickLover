import { useEffect, useRef } from 'react';

const useOutsideClick = (handler) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClick);
  }, [handler]);

  return ref;
};

export default useOutsideClick;
