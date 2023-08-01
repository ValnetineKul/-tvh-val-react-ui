import { useEffect, useRef } from 'react';

const useDisabledTabIndex = (container: HTMLElement | null, isLoading: boolean) => {
  const tabIndexes = useRef(new Map());

  useEffect(() => {
    if (!container) {
      return;
    }

    const interactiveElements: HTMLElement[] = Array.from(
      container.querySelectorAll('button, input, select, textarea, [tabindex]')
    );

    if (isLoading) {
      return interactiveElements.forEach((el) => {
        tabIndexes.current.set(el, el.tabIndex);
        el.tabIndex = -1;
      });
    }

    if (tabIndexes.current.size === 0) {
      return;
    }

    interactiveElements.forEach((el) => {
      const tabIndex = tabIndexes.current.get(el);
      el.tabIndex = tabIndex;
      tabIndexes.current.delete(el);
    });
  }, [container, isLoading]);

  return tabIndexes.current;
};

export default useDisabledTabIndex;
