import type { FontDefinition } from '../types';

export interface RawFontDefinition {
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  fontSize: string;
  letterSpacing: 'none';
  paragraphSpacing: 'none';
  textDecoration: string;
  textCase: string;
}

export type TypographyField = Record<string, RawFontDefinition>;

export type DataField = 'color' | 'spacing' | 'borderRadius';
export type DataFields = Partial<Record<DataField, Record<string, string | undefined>>> & {
  typography?: Record<string, FontDefinition>;
};

export type ThemeId = 'global' | 'agri' | 'darkmode';

export type Data = Partial<Record<ThemeId, DataFields>>;
