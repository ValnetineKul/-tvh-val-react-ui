import { useEffect, useReducer } from 'react';

type Component = 'Modal' | 'DropdownMenu:mobile' | 'Select:mobileModal';

type ComponentsData = {
  [key in Component]?: {
    count: number;
    subscribers: ((count: number) => void)[];
  };
};

const componentsData: ComponentsData = {};

function useForceRerender(): () => void {
  return useReducer(() => ({}), {})[1] as () => void;
}

const getComponentInfo = (componentName: Component) => {
  let componentInfo = componentsData[componentName];
  if (!componentInfo) {
    componentInfo = {
      count: 0,
      subscribers: [],
    };
    componentsData[componentName] = componentInfo;
  }
  return componentInfo;
};

export const useComponentCount = (componentName: Component): { count: number; isVisible: boolean } => {
  const rerender = useForceRerender();

  useEffect(() => {
    const componentInfo = getComponentInfo(componentName);
    const fn = rerender;
    componentInfo.subscribers.push(fn);
    return () => {
      componentInfo.subscribers = componentInfo.subscribers.filter((cb) => cb !== fn);
    };
  }, [componentName, rerender]);

  const count = componentsData[componentName]?.count ?? 0;

  return { count, isVisible: count > 0 };
};

export const useComponentCountController = (componentName: Component, isVisible = true) => {
  useEffect(() => {
    if (isVisible) {
      const componentInfo = getComponentInfo(componentName);
      componentInfo.count += 1;
      componentInfo.subscribers.forEach((cb) => cb(componentInfo.count));
      return () => {
        componentInfo.count -= 1;
        componentInfo.subscribers.forEach((cb) => cb(componentInfo.count));
      };
    }
  }, [componentName, isVisible]);
};
