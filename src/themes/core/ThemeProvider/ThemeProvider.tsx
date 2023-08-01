import React from 'react';
import type { Theme } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './styles.css';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ConfigProvider, defaultLocale } from '../ConfigProvider';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

const ThemeProvider: React.FC<{ locale?: string; settedLocale?: string; theme: Theme }> = ({
  children,
  locale = defaultLocale,
  settedLocale,
  theme,
}) => {
  return (
    <CacheProvider value={muiCache}>
      <MuiThemeProvider theme={theme}>
        <ConfigProvider locale={locale} settedLocale={settedLocale || locale}>
          <CssBaseline />
          {children}
        </ConfigProvider>
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
