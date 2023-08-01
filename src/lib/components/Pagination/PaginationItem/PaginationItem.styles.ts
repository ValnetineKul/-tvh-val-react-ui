import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'disabled'>({ name: 'PaginationItem' })((theme, _, classes) => ({
  page: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
  },
  linkButton: {
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.color['bg/surfaceCurrent/hover'],
    },
    '&:active': {
      textDecoration: 'none',
      backgroundColor: theme.color['bg/surfaceCurrent/active'],
    },
  },
  ellipsis: {
    width: 32,
    height: 32,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    [`&.${classes.disabled}`]: {
      color: theme.color['text/onSurfaceCurrent/disabled'],
    },
  },
  disabled: {},
  arrowButton: {
    padding: theme.layoutSpacing['spacing/300'],
  },
}));

export default useStyles;
