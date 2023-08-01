import type { Breakpoint, Theme } from '@mui/material/styles';
import { makeStyles } from '../../../themes/core';

const GRID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const BREAKPOINTS = ['xs', 'sm', 'md', 'lg'];
type StyleRecord = Record<string, { [breakpoint: string]: { flexBasis: string; flexGrow: number; maxWidth: string } }>;

const generateGrid = (theme: Theme) => {
  const styles: StyleRecord = {};

  BREAKPOINTS.forEach((breakpoint) => {
    GRID.forEach((grid) => {
      const width = `${Math.round((grid / 12) * 10e7) / 10e5}%`;

      styles[`${breakpoint}${grid}`] = {
        [theme.breakpoints.up(breakpoint as Breakpoint)]: {
          flexBasis: width,
          flexGrow: 0,
          maxWidth: width,
        },
      };
    });
  });

  return styles;
};

const useStyles = makeStyles<void, 'item'>({ name: 'Grid' })((theme, _params, classes) => ({
  container: {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',

    margin: `-${theme.layoutSpacing['spacing/300']}`,
    width: `calc(100% + ${theme.layoutSpacing['spacing/400']})`,
    [`& > .${classes.item}`]: {
      padding: theme.layoutSpacing['spacing/300'],
    },

    [theme.breakpoints.up('sm')]: {
      margin: `-${theme.layoutSpacing['spacing/350']}`,
      width: `calc(100% + ${theme.layoutSpacing['spacing/450']})`,
      [`& > .${classes.item}`]: {
        padding: theme.layoutSpacing['spacing/350'],
      },
    },
  },

  item: {
    boxSizing: 'border-box',
    margin: theme.layoutSpacing['spacing/000'],
  },

  ...generateGrid(theme),
}));

export default useStyles;
