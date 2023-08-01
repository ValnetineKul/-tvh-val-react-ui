export const convertSvgToDynamicFillSvg = (svgString: string, isColoredIcon: boolean) => {
  if (isColoredIcon) {
    return svgString;
  }

  const fillFilter = /fill=".*?"/gm;
  const strokeFilter = /stroke=".*?"/gm;

  return svgString.replace(fillFilter, 'fill="currentColor"').replace(strokeFilter, 'stroke="currentColor"');
};
