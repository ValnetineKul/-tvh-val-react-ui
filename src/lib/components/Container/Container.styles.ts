import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'disableGutters'>({ name: 'Container' })((theme, _params, classes) => ({
  root: {
    maxWidth: 1272,
    paddingLeft: theme.layoutSpacing['spacing/400'],
    paddingRight: theme.layoutSpacing['spacing/400'],
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.layoutSpacing['spacing/450'],
      paddingRight: theme.layoutSpacing['spacing/450'],
    },

    [`&.${classes.disableGutters}`]: {
      paddingLeft: theme.layoutSpacing['spacing/000'],
      paddingRight: theme.layoutSpacing['spacing/000'],
    },
  },
  disableGutters: {},
}));

export default useStyles;
