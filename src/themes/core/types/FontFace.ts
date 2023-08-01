export interface FontFace {
  fontFamily: string;
  fontStyle: 'normal' | 'italic';
  fontWeight: number;
  src: `url(${string}) format("${'woff' | 'woff2' | 'truetype' | 'opentype' | 'embedded-opentype'}")`;
}

export function mapFontFaceToCss(fontFace: FontFace) {
  return `@font-face {
    font-family: '${fontFace.fontFamily}';
    font-style: '${fontFace.fontStyle}';
    font-weight: ${fontFace.fontWeight};
    src: ${fontFace.src};
  }`;
}
