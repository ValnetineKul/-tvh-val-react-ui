import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'disabled'>({ name: 'ListOptionSelector' })((theme, _, classes) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    [`&.${classes.disabled}`]: {
      color: theme.color['text/onSurfaceCurrent/disabled'],
    },
  },
  value: {
    marginLeft: theme.layoutSpacing['spacing/200'],
    paddingLeft: theme.layoutSpacing['spacing/200'],
    paddingRight: theme.layoutSpacing['spacing/200'],
    '&:not(:disabled) svg': {
      color: theme.color['icon/onSurfaceCurrent/default'],
    },
    '&:active': {
      color: `${theme.color['text/onSurfaceCurrent/primary/default']} !important`,
    },
    '&:hover': {
      backgroundColor: theme.color['bg/surfaceTransparent/hover'],
    },
    '&:hover svg, &:focus svg, &:active svg': {
      color: theme.color['icon/onSurfaceCurrent/action/default'],
    },
    '&:disabled': {
      textDecoration: 'none',
    },
  },
  disabled: {},
  dividerRoot: {
    marginTop: theme.layoutSpacing['spacing/000'],
    marginBottom: theme.layoutSpacing['spacing/000'],
  },
}));

export default useStyles;
