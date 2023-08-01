/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import { addDecorator } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { theme as defaultTheme } from '../src/themes/tvh';
import { theme as agriTheme } from '../src/themes/agri';
import { ThemeProvider, createTheme } from '../src/themes/core';
import Surface from '../src/lib/components/Surfaces/Surface';

const themes = {
  tvh: createTheme(defaultTheme),
  agri: createTheme(agriTheme),
};

addDecorator((Story, args) => (
  <MemoryRouter initialEntries={['/']}>
    <Story {...args} />
  </MemoryRouter>
));

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

export const globalTypes = {
  surface: {
    name: 'Surface',
    description: 'Surface color',
    defaultValue: '100',
    toolbar: {
      icon: 'paintbrush',
      items: ['100', '150', '200', '300', 'Primary', 'Secondary', 'Error', 'Info', 'Neutral', 'Success', 'Warning'],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Theme',
    defaultValue: 'tvh',
    toolbar: {
      icon: 'graphline',
      items: ['tvh', 'agri'],
    },
  },
  locale: {
    name: 'Locale',
    description: 'Locale',
    defaultValue: 'en-GB',
    toolbar: {
      icon: 'globe',
      items: ['en-GB', 'en-US', 'fr-BE', 'nl-BE', 'ru-RU', 'en-MX', 'es-CA'],
    },
  },
};

addDecorator((Story, context) => {
  const themeId = context.globals.theme || 'tvh';
  const theme = themes[themeId];
  const locale = context.globals.locale || 'en-GB';
  const isFullScreenLayout = context.parameters.layout === 'fullscreen';

  return (
    <EmotionThemeProvider theme={theme}>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme} locale={locale}>
          <CssBaseline />
          <Surface
            color={context.globals.surface}
            style={!isFullScreenLayout ? { padding: '1rem', margin: '-1rem' } : undefined}
          >
            <Story {...context} />
          </Surface>
        </ThemeProvider>
      </CacheProvider>
    </EmotionThemeProvider>
  );
});

export const argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
};

const breakpoints = [320, 600, 960, 1280, 1920, 2560];
const viewportNames = ['xs', 'sm', 'md', 'lg', 'xl'];
const deviceTypes = ['mobile', 'mobile', 'tablet', 'desktop', 'desktop'];
const viewports = viewportNames.reduce((acc, name, idx) => {
  acc[name] = {
    name,
    styles: {
      width: `${breakpoints[idx]}px`,
      height: `${breakpoints[idx + 1] - 1}px`,
      type: deviceTypes[idx],
    },
  };
  return acc;
}, {});

export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Foundations', 'Components'],
      locales: '',
    },
  },
  docs: {
    transformSource: (src) => src.replace(/icon={{.*?}}/gs, `icon={IconName}`),
    // fixing issues with storybook crashing when template has components with array of ReactElements
    source: { type: 'code' },
  },
  viewport: {
    viewports,
  },
  backgrounds: {
    disable: true,
  },
  controls: {
    sort: 'requiredFirst',
    matchers: {
      date: /Date$/,
    },
  },
};
