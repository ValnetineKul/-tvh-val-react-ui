import type { ThemeOptions } from '@mui/material/styles';
import type { Font } from '../core';
import { mapFontFaceToCss } from '../core';
import { NotoSansRegular, NotoSansBold, CodecProUltraItalic } from './font';
import borderRadius from './tokens/borderRadius.json';
import color from './tokens/color.json';
import typographyFont from './tokens/typography.json';
import spacing from './tokens/layoutSpacing.json';
import shadow from './tokens/shadow.json';
import zPosition from './tokens/zPosition.json';
import positiveLogo from './assets/logos/positiveLogo.svg';
import negativeLogo from './assets/logos/negativeLogo.svg';

export const theme: ThemeOptions = {
  typography: {
    fontFamily: '"Noto Sans", Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ${[NotoSansRegular, NotoSansBold, CodecProUltraItalic].map((fontFace) => mapFontFaceToCss(fontFace)).join('\n')}
        body {
          font-size: 0.875rem;
          line-height: 1.43;
        }
      `,
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  borderRadius,
  color,
  font: typographyFont as Font,
  layoutSpacing: spacing,
  zPosition,
  shadow,
  logo: {
    positive: positiveLogo,
    negative: negativeLogo,
  },
};
