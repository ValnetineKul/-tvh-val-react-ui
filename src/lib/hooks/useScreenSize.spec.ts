import { useTheme } from '@mui/material/styles';
import type { Breakpoint } from '@mui/material/styles';
import { initResponsiveTest, renderHook } from '../test-utils';
import type { DesiredSize } from './useScreenSize';
import useScreenSize from './useScreenSize';

interface Case {
  sizeName: DesiredSize;
  breakpoint: Breakpoint;
  upBreakpoint: Breakpoint;
}
const cases: Case[] = [
  { sizeName: 'Tablet', breakpoint: 'sm', upBreakpoint: 'md' },
  { sizeName: 'Desktop', breakpoint: 'md', upBreakpoint: 'lg' },
  { sizeName: 'LgDesktop', breakpoint: 'lg', upBreakpoint: 'xl' },
];

const casesWithXl: Case[] = cases.concat({ sizeName: 'XlDesktop', breakpoint: 'xl', upBreakpoint: 'xl' });

describe('useScreenSize', () => {
  it.each(casesWithXl)(
    'Should work correctly when screen is LESS than $breakpoint',
    ({ sizeName, breakpoint }: Case) => {
      const themeHook = renderHook(() => useTheme());
      const theme = themeHook.result.current;
      initResponsiveTest(theme.breakpoints.values[breakpoint] - 1);
      const screenSizeHook = renderHook(() => useScreenSize(sizeName));

      const sizes = screenSizeHook.result.current as Record<string, boolean>;

      expect(sizes[`is${sizeName}`]).toBe(false);
      expect(sizes[`is${sizeName}Up`]).toBe(false);
    }
  );

  it.each(casesWithXl)('Should work correctly when screen IS $breakpoint', ({ sizeName, breakpoint }: Case) => {
    const themeHook = renderHook(() => useTheme());
    const theme = themeHook.result.current;
    initResponsiveTest(theme.breakpoints.values[breakpoint]);
    const screenSizeHook = renderHook(() => useScreenSize(sizeName));

    const sizes = screenSizeHook.result.current as Record<string, boolean>;

    expect(sizes[`is${sizeName}`]).toBe(true);
    expect(sizes[`is${sizeName}Up`]).toBe(true);
  });

  it.each(cases)('Should work correctly when screen is MORE than $breakpoint', ({ sizeName, upBreakpoint }: Case) => {
    const themeHook = renderHook(() => useTheme());
    const theme = themeHook.result.current;
    initResponsiveTest(theme.breakpoints.values[upBreakpoint]);
    const screenSizeHook = renderHook(() => useScreenSize(sizeName));

    const sizes = screenSizeHook.result.current as Record<string, boolean>;

    expect(sizes[`is${sizeName}`]).toBe(false);
    expect(sizes[`is${sizeName}Up`]).toBe(true);
  });
});
