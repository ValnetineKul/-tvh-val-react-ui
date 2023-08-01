import type { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@mui/material/styles';
import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider as MuiStyledEngineProvider,
} from '@mui/material/styles';

import type {
  Font,
  BorderRadius,
  Color,
  ExtraColor,
  CurrentColor,
  Spacing,
  Shadow,
  Logo,
  ZPosition,
} from '../src/themes/core/types';

declare module '@mui/utils/capitalize' {
  export default function capitalize<T extends string>(string: T): Capitalize<T>;
}

declare module '@mui/material/styles' {
  const ThemeProvider = MuiThemeProvider;
  const StyledEngineProvider = MuiStyledEngineProvider;

  interface ThemeOptions extends MuiThemeOptions {
    logo: {
      [key in Logo]: string;
    };
    borderRadius: {
      [key in BorderRadius]: string;
    };
    color: {
      [key in DefaultColor]: string;
    } & {
      [key in Color]: string;
    } & Partial<{
        [key in InvertedColor]: string;
      }> &
      Partial<{
        [key in ExtraColor]: string;
      }>;
    font: Font;
    layoutSpacing: {
      [key in Spacing]: string;
    };
    zIndex: never;
    zPosition: {
      [key in ZPosition]: number;
    };
    shadow: {
      [key in Shadow]: string;
    };
  }

  interface Theme extends MuiTheme {
    logo: {
      [key in Logo]: string;
    };
    borderRadius: {
      [key in BorderRadius]: string;
    };
    color: {
      [key in Color]: string;
    } & {
      [key in CurrentColor]: string;
    } & {
      [key in ExtraColor]: string;
    };
    font: Font;
    layoutSpacing: {
      [key in Spacing]: string;
    };
    zIndex: never;
    zPosition: {
      [key in ZPosition]: number;
    };
    shadow: {
      [key in Shadow]: string;
    };
    spacing: never;
  }
}

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends MuiTheme {
    logo: {
      [key in Logo]: string;
    };
    borderRadius: {
      [key in BorderRadius]: string;
    };
    color: {
      [key in Color]: string;
    } & {
      [key in ExtraColor]: string;
    };
    font: Font;
    layoutSpacing: {
      [key in Spacing]: string;
    };
    zIndex: never;
    zPosition: {
      [key in ZPosition]: number;
    };
    shadow: {
      [key in Shadow]: string;
    };
  }
}
