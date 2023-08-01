import { useRef } from 'react';

const useLazyRef = <Value>(init: () => Value) => {
  const ref = useRef<Value>();

  if (ref.current === undefined) {
    ref.current = init();
  }

  return ref.current;
};

export default useLazyRef;
