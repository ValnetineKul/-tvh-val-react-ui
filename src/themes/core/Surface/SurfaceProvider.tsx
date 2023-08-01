import type { FC } from 'react';
import React, { useMemo } from 'react';
import { applyColor, useTheme } from '../ThemeProvider';
import ThemeProvider from '../ThemeProvider/ThemeProvider';
import { useConfigContext } from '../ConfigProvider';
import type { Surface } from './SurfaceContext';
import SurfaceContext from './SurfaceContext';

interface Props {
  color: Surface;
}

const SurfaceProvider: FC<Props> = ({ color = '100', children }) => {
  const parentTheme = useTheme();
  const newTheme = useMemo(() => {
    const theme = {
      ...parentTheme,
    };
    applyColor(theme, { onSurface: color });
    return theme;
  }, [color, parentTheme]);

  const value = useMemo(() => ({ color }), [color]);
  const { locale, settedLocale } = useConfigContext();
  return (
    <SurfaceContext.Provider value={value}>
      <ThemeProvider theme={newTheme} locale={locale} settedLocale={settedLocale}>
        {children}
      </ThemeProvider>
    </SurfaceContext.Provider>
  );
};

export default SurfaceProvider;
