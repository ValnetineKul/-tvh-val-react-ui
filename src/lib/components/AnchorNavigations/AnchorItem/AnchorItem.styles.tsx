import { makeStyles } from '../../../../themes/core';

const surface = '300';

const useStyles = makeStyles({ name: 'AnchorItem' })((theme) => ({
  tabItem: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
    minHeight: 'auto',
    minWidth: 'auto',
    opacity: 1,
    textTransform: 'none',
    whiteSpace: 'nowrap',
  },

  active: {
    '&:before': {
      content: '""',
      width: '100%',
      height: 2,
      backgroundColor: theme.color[`border/onSurface${surface}/selected` as const],
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
  },
}));

export default useStyles;
