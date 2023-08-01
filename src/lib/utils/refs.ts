import type { MutableRefObject, Ref } from 'react';

export function mergeRefs<T>(refs: (Ref<T> | undefined | null)[]): Ref<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
