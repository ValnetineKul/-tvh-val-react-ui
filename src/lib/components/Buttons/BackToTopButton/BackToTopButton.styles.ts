import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'backToTop'>({ name: 'BackToTopButton' })((theme, _params, classes) => ({
  root: {
    '&:disabled': {
      backgroundColor: theme.color['bg/disabled'],
    },
    [`.MuiButtonBase-root + &.${classes.backToTop}`]: {
      bottom: `calc(${theme.layoutSpacing['spacing/300']} + 40px + ${theme.layoutSpacing['spacing/300']})`,
      [theme.breakpoints.up('sm')]: {
        bottom: `calc(${theme.layoutSpacing['spacing/450']} + 56px + ${theme.layoutSpacing['spacing/400']})`,
      },
    },
  },
  backToTop: {},
}));

export default useStyles;
