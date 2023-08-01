import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import type { Breakpoint } from '@mui/material/styles';

// https://zeroheight.com/71b6858da/p/4036ba-layout/b/56984a

export type DesiredSize = 'XlDesktop' | 'LgDesktop' | 'Desktop' | 'Tablet';

enum BreakpoinBySize {
  'XlDesktop' = 'xl',
  'LgDesktop' = 'lg',
  'Desktop' = 'md',
  'Tablet' = 'sm',
}

type ScreenSize<T> = {
  [size in `is${string & T}${'' | 'Up'}`]: boolean;
};

const useScreenSize = <Size extends DesiredSize>(desiredSize: Size): ScreenSize<Size> => {
  const theme = useTheme();
  const breakpoint: Breakpoint = BreakpoinBySize[desiredSize];

  const isCurrentSizeExact = useMediaQuery(theme.breakpoints.only(breakpoint), { noSsr: true });
  const isCurrentSizeUp = useMediaQuery(theme.breakpoints.up(breakpoint), { noSsr: true });

  return {
    [`is${desiredSize}Up`]: isCurrentSizeUp,
    [`is${desiredSize}`]: isCurrentSizeExact,
  } as ScreenSize<Size>;
};

export default useScreenSize;
