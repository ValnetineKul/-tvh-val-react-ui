import type { FontDefinition } from '../../../types/FontDefinition';
import type { RawFontDefinition } from '../../types';

enum FontWeight {
  'Ultra Italic' = '900',
  'Black' = '800',
  'Bold' = '700',
  'Regular' = '400',
  'Italic' = '400',
}

enum FontStyle {
  'Italic' = 'italic',
  'Ultra Italic' = 'italic',
}

const mapFontFields = <T extends keyof RawFontDefinition>(fieldName: T, value: RawFontDefinition[T]) => {
  switch (fieldName) {
    case 'fontWeight': {
      return {
        fontWeight: FontWeight[value as keyof typeof FontWeight],
        ...(FontStyle[value as keyof typeof FontStyle]
          ? { fontStyle: FontStyle[value as keyof typeof FontStyle] }
          : {}),
      };
    }

    case 'textCase': {
      return value === 'none' ? {} : { textTransform: value as FontDefinition['textTransform'] };
    }

    default: {
      return value === 'none' ? {} : { [fieldName]: value as FontDefinition[keyof FontDefinition] };
    }
  }
};

export default mapFontFields;
