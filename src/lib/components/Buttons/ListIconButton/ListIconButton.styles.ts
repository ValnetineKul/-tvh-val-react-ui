import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'checked'>({ name: 'ListIconButton' })((theme, _, classes) => ({
  root: {
    display: 'inline-flex',
    justifyContent: 'center',
    border: 'none',
    background: theme.color['bg/iconButton/list/default'],
    cursor: 'pointer',
    position: 'relative',
    alignItems: 'unset',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderColor: `transparent transparent ${theme.color['bg/surfaceCurrent/default']} transparent `,
    },

    [`&.${classes.checked}`]: {
      background: theme.color['bg/iconButton/list/checked'],
    },

    '&:not(:disabled):not(:active):hover': {
      background: theme.color['bg/iconButton/list/hover'],
    },

    '&:not(:disabled):focus': {
      outline: `${theme.color['border/onSurfaceCurrent/focus']} solid ${theme.layoutSpacing['spacing/200']}`,
    },

    '&:not(:disabled):active': {
      background: theme.color['bg/iconButton/list/active'],
    },

    '&:disabled': {
      background: theme.color['bg/disabled'],
      cursor: 'default',
    },
  },

  sizeMd: {
    height: 40,
    width: 32,
    paddingTop: theme.layoutSpacing['spacing/200'],
    '&:after': {
      borderWidth: '0 16px 7px 16px',
    },
  },

  sizeSm: {
    height: 32,
    width: 24,
    paddingTop: `calc(${theme.layoutSpacing['spacing/200']} + 1px)`,
    '&:after': {
      borderWidth: '0 12px 6px 12px',
    },
  },

  checked: {},
}));

export default useStyles;
