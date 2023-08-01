import deepmerge from 'deepmerge';
import type { ThemeOptions } from '@mui/material/styles';
import { theme as defaultTheme } from '../tvh';
import color from './tokens/color.json';
import positiveLogo from './assets/logos/positiveLogo.svg';
import negativeLogo from './assets/logos/negativeLogo.svg';
import subLogo from './assets/logos/subLogo.svg';

export const theme: ThemeOptions = deepmerge(defaultTheme, {
  color,
  logo: {
    positive: positiveLogo,
    negative: negativeLogo,
    subLogo,
  },
}) as ThemeOptions;
