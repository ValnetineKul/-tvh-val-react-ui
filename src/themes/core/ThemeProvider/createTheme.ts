import type { ThemeOptions, Theme } from '@mui/material/styles';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import type { Surface } from '../Surface';

const overrides: Partial<Theme> = {
  components: {
    MuiButton: {
      styleOverrides: {
        startIcon: {
          '& > *:nth-of-type(1)': {
            fontSize: undefined, // TODO: this override doesn't work like MUI4 anymore, causing it to not replace the default
          },
        },
        endIcon: {
          '& > *:nth-of-type(1)': {
            fontSize: undefined,
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            padding: undefined,
            '& .MuiAutocomplete-input': {
              padding: undefined,
            },
          },
        },
      },
    },
  },
};

export const applyColor = (newTheme: Theme, { onSurface }: { onSurface?: Surface } = {}) => {
  const theme = (newTheme as unknown as { defaultThemeOptions: Theme }).defaultThemeOptions;
  newTheme.color = new Proxy(theme.color, {
    get(target, prop: keyof Theme['color']) {
      if ((prop in target && target[prop]) || typeof prop !== 'string') {
        return target[prop];
      }

      const regex = /(.*?\/(on)?[sS]urface)(.+?)(\/.+)?$/;

      const matchString = prop.match(regex) as [string, string, string, Surface] | null;
      if (!matchString) {
        // sometimes in the storybook prop is equal to `toJSON`
        // this is a workaround
        return target[prop];
      }
      let color = matchString[3];

      const replaceSurface = (token: string, newSurface: Surface | 'Inverted' | 'Default') =>
        token.replace(regex, `$1${newSurface}$4`) as keyof Theme['color'];

      if ((color as Surface | 'Current') === 'Current') {
        if (onSurface === undefined || onSurface === null) {
          throw new Error(
            'onSurface is not defined. Try wrapping the application in SurfaceProvider or Surface component'
          );
        }
        color = onSurface;
        const fallbackProp = replaceSurface(prop, color);
        if (fallbackProp in target && target[fallbackProp]) {
          return target[fallbackProp];
        }
        // continue executing, since color might be Primary or Secondary
      }

      // if no token for Primary or Secondary, use Inverted
      if (color === 'Primary' || color === 'Secondary') {
        const fallbackProp = replaceSurface(prop, 'Inverted');
        return target[fallbackProp];
      }

      const fallbackProp = replaceSurface(prop, 'Default');
      if (!target[fallbackProp]) {
        // eslint-disable-next-line no-console
        console.error(`Incorrect color token ${prop}!`);
      }

      return target[fallbackProp];
    },
  });
};

export const createTheme = (theme: ThemeOptions) => {
  const newTheme = createMuiTheme(theme, overrides);

  (newTheme as unknown as { defaultThemeOptions: ThemeOptions }).defaultThemeOptions = theme;

  applyColor(newTheme);

  return newTheme;
};
