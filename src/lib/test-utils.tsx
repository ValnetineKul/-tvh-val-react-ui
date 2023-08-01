import userEvent from '@testing-library/user-event';
import { fireEvent, render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '../themes/tvh';
import { createTheme, ThemeProvider, SurfaceProvider } from '../themes/core';

export const muiTheme = createTheme(theme);

const AllTheProviders: React.FC = ({ children }) => {
  return (
    <MemoryRouter>
      <ThemeProvider theme={muiTheme}>
        <SurfaceProvider color="100">{children}</SurfaceProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

const customRender = (component: React.ReactElement, options?: Parameters<typeof render>[1]) =>
  render(component, { wrapper: AllTheProviders, ...options });

const customRenderHook: typeof renderHook = (hook, options) =>
  renderHook(hook, { wrapper: AllTheProviders, ...options });

export const initResponsiveTest = (size: number | 'Mobile' | 'Tablet' | 'Desktop' | 'LgDesktop' | 'XlDesktop') => {
  let width: number;
  if (size === 'Mobile') width = muiTheme.breakpoints.values.sm - 1;
  else if (size === 'Tablet') width = muiTheme.breakpoints.values.sm;
  else if (size === 'Desktop') width = muiTheme.breakpoints.values.md;
  else if (size === 'LgDesktop') width = muiTheme.breakpoints.values.lg;
  else if (size === 'XlDesktop') width = muiTheme.breakpoints.values.xl;
  else width = size;

  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });

  window.matchMedia = jest.fn().mockImplementation((query) => {
    const queryWidthInterval: string[] = query.match(/\d+(\.\d+)?/g);

    let matches;
    if (queryWidthInterval.length === 2) {
      matches = width >= +queryWidthInterval[0] && width < +queryWidthInterval[1];
    } else {
      const queryWidth = +queryWidthInterval[0];
      const isDown = /max/.test(query);

      matches = isDown ? width <= queryWidth : width >= queryWidth;
    }

    return {
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });
};

const customUserEvent = Object.assign(userEvent, {
  mouseDown: fireEvent.mouseDown,
  mouseUp: fireEvent.mouseUp,
  mouseMove: fireEvent.mouseMove,
  scroll: fireEvent.scroll,
  error: fireEvent.error,
});

export { screen, within, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react';
// override render method
export { customRender as render, customRenderHook as renderHook, customUserEvent as userEvent };
