const getViewportSize = (documentViewportSize: number, startCoord: number, endCoord: number) => {
  let viewportSize = documentViewportSize;

  if (startCoord > 0) {
    viewportSize -= startCoord;
  }
  if (endCoord < documentViewportSize) {
    viewportSize -= documentViewportSize - endCoord;
  }

  return viewportSize;
};

const getCoord = (containerSize: number, containerViewportSize: number, childSize: number, offset: number) => {
  let coord = containerViewportSize / 2 + offset - childSize / 2;

  if (coord < 0) {
    coord = 0;
  }
  if (offset >= containerSize - childSize) {
    coord = containerSize - childSize;
  }

  return coord;
};

interface Params {
  container: HTMLDivElement | null;
  childComponent: HTMLDivElement | null;
  prevChildSize?: number;
  prevContainerTop?: number;
  prevContainerWidth?: number;
  prevDocumenHeight?: number;
}

const moveIntoViewportCenter = ({
  container,
  childComponent,
  prevChildSize,
  prevContainerTop,
  prevContainerWidth,
  prevDocumenHeight,
}: Params) => {
  if (!container || !childComponent) {
    return null;
  }

  const childSize = childComponent.getBoundingClientRect().width;
  if (prevChildSize && childSize !== prevChildSize) {
    return null;
  }

  const {
    top: containerTop,
    bottom: containerBottom,
    height: containerHeight,
    width: containerWidth,
  } = container.getBoundingClientRect();

  const documentViewportHeight: number = document.documentElement.clientHeight;

  if (
    prevContainerTop === containerTop &&
    prevContainerWidth === containerWidth &&
    documentViewportHeight === prevDocumenHeight &&
    prevChildSize === childSize
  ) {
    return requestAnimationFrame(() => {
      moveIntoViewportCenter({
        container,
        childComponent,
        prevChildSize: childSize,
        prevContainerTop,
        prevContainerWidth,
        prevDocumenHeight: documentViewportHeight,
      });
    });
  }

  const contanerViewportHeight = getViewportSize(documentViewportHeight, containerTop, containerBottom);

  const topOffset = containerTop < 0 ? -containerTop : 0;
  const top = getCoord(containerHeight, contanerViewportHeight, childSize, topOffset);
  const left = containerWidth / 2 - childSize / 2;

  childComponent.style.transform = `translate(${left}px, ${top}px)`;
  if (childComponent.style.display !== 'block') {
    childComponent.style.display = 'block';
  }

  return requestAnimationFrame(() => {
    moveIntoViewportCenter({
      container,
      childComponent,
      prevChildSize: childSize,
      prevContainerTop: containerTop,
      prevContainerWidth: containerWidth,
      prevDocumenHeight: documentViewportHeight,
    });
  });
};

export default moveIntoViewportCenter;
