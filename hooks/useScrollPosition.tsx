import { useState, useEffect, useRef } from 'react';

const useScrollPosition = (ref) => {
  const [isNearTop, setIsNearTop] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const isWithinThreshold = ref.current.scrollTop <= 0;
      setIsNearTop(isWithinThreshold);
    };

    if (ref.current) {
      updatePosition();
      ref.current.addEventListener('scroll', updatePosition);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', updatePosition);
      }
    };
  }, [ref]);

  return isNearTop;
};

export default useScrollPosition;
