import type { TypographyTokens } from './TypographyTokens';
import type { FontDefinition } from './FontDefinition';

export type { ZPosition } from './ZPosition';
export type { BorderRadius } from './BorderRadius';
export type { Color, ExtraColor, DefaultColor, InvertedColor, CurrentColor } from './Color';
export type { Spacing } from './Spacing';
export type { Shadow } from './Shadow';
export type { FontFace } from './FontFace';
export type Font = Record<TypographyTokens, FontDefinition>;
export { mapFontFaceToCss } from './FontFace';
export type { FontDefinition };
