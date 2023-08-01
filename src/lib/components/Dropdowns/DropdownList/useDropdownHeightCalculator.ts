import React from 'react';
import { MINIMUM_LIST_HEIGHT } from './DropdownList.constants';

const getSpaceAboveAnchor = (anchor: HTMLElement) => {
  return anchor instanceof HTMLElement ? anchor.offsetTop : 0;
};

const getAnchorHeight = (anchor: HTMLElement) => {
  return anchor instanceof HTMLElement ? anchor.offsetHeight : 0;
};

const getSpaceAboveList = (listContainer: HTMLDivElement) => {
  return listContainer instanceof HTMLDivElement ? listContainer.offsetTop : 0;
};

const getActionContainerHeight = (action: HTMLDivElement) => {
  return action instanceof HTMLDivElement ? action.clientHeight : 0;
};

const elementPositionRelativeToWindow = (element: HTMLElement) => {
  const position = ['bottom', 'top'] as const;
  const elementOffset = element instanceof HTMLElement ? element.offsetTop : 0;
  const windowHeight = window.innerHeight;
  return position[Math.round((windowHeight - elementOffset) / windowHeight)];
};

type ReturnType = [
  Map<string, number>,
  (
    anchor: HTMLElement,
    anchorPosition: 'bottom' | 'top',
    listContainer: HTMLDivElement,
    action: HTMLDivElement,
    offset: number
  ) => number
];
const getMaxListHeight = (inCache?: Map<string, number>): ReturnType => {
  const cache = inCache || new Map();

  const saveToCache = (key: string, value: number) => {
    if (value !== 0) {
      cache.set(key, value);
    }
    return value;
  };

  return [
    cache,
    (anchor, anchorPosition, listContainer, action, offset) => {
      let result = 0;
      const spaceAboveList = getSpaceAboveList(listContainer);
      const actionHeight = getActionContainerHeight(action);

      if (anchorPosition === 'top') {
        const spaceAboveAnchor =
          cache.get('spaceAboveAnchor') || saveToCache('spaceAboveAnchor', getSpaceAboveAnchor(anchor));
        const anchorHeight = cache.get('anchorHeight') || saveToCache('anchorHeight', getAnchorHeight(anchor));
        const spaceToDeduct = [spaceAboveAnchor, anchorHeight, spaceAboveList, actionHeight].reduce((a, b) => a + b, 0);

        result = window.innerHeight - spaceToDeduct - offset;
      } else {
        const spaceAboveAnchor = getSpaceAboveAnchor(anchor);
        const spaceToDeduct = [spaceAboveList, actionHeight].reduce((a, b) => a + b, 0);

        result = spaceAboveAnchor - spaceToDeduct - offset;
      }

      return Math.max(MINIMUM_LIST_HEIGHT, result);
    },
  ];
};

function useDropdownHeightCalculator(
  anchor: HTMLElement,
  action: HTMLDivElement,
  visibleItemsCount: number,
  itemHeight: number,
  offset: number
) {
  const [listContainer, setListContainer] = React.useState<HTMLDivElement>(null);
  const [maxListHeight, setMaxListHeight] = React.useState(0);

  const anchorPosition = elementPositionRelativeToWindow(anchor);

  const cache = React.useRef(new Map<string, number>());
  const [returnedCache, getMaxListHeightFn] = getMaxListHeight(cache.current);
  const height = getMaxListHeightFn(anchor, anchorPosition, listContainer, action, offset);

  if (height !== maxListHeight) setMaxListHeight(height);
  cache.current = returnedCache;

  React.useEffect(() => {
    const onResize = () => {
      const maxHeight = getMaxListHeightFn(anchor, anchorPosition, listContainer, action, offset);
      if (maxListHeight === maxHeight) return;
      setMaxListHeight(maxHeight);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line
  }, []);

  return {
    anchorPosition,
    listHeight: visibleItemsCount * itemHeight,
    maxListHeight,
    setListContainer,
  };
}

export default useDropdownHeightCalculator;
