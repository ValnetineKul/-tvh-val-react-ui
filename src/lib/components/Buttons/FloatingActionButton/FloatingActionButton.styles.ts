import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'FloatingActionButton' })((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 1500,
    right: theme.layoutSpacing['spacing/300'],
    bottom: theme.layoutSpacing['spacing/300'],
    width: 40,
    height: 40,
    borderRadius: `calc(${theme.borderRadius['borderRadius/circle']} / 2)`,
    boxShadow: 'none',
    '&:disabled': {
      backgroundColor: theme.color['bg/disabled'],
      color: theme.color['text/onSurface100/disabled'],
    },
    [theme.breakpoints.up('sm')]: {
      width: 56,
      height: 56,
      right: theme.layoutSpacing['spacing/450'],
      bottom: theme.layoutSpacing['spacing/450'],
    },
  },
}));

export default useStyles;
