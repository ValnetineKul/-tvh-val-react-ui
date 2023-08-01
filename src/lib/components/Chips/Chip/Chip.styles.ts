import { makeStyles } from '../../../../themes/core';
import { surface } from './Chip.constants';

const useStyles = makeStyles<void, 'disabled' | 'root'>({ name: 'Chip' })((theme, _, classes) => ({
  wrapper: {
    display: 'inline-block',
    position: 'relative',
  },
  root: {
    display: 'inline-flex',
    outline: 'none',
    alignItems: 'center',
    borderRadius: theme.borderRadius['borderRadius/round/100'],
    padding: `calc(${theme.layoutSpacing['spacing/200']} - 1px) calc(${theme.layoutSpacing['spacing/300']} - 1px)`,
    '&:disabled': {
      backgroundColor: theme.color['bg/disabled'],
    },
  },

  label: {
    whiteSpace: 'nowrap',
  },

  icon: {
    color: theme.color[`icon/onSurface${surface}/default` as const],
    marginRight: theme.layoutSpacing['spacing/300'],
    [`.${classes.disabled} &`]: {
      color: 'currentColor',
    },
  },

  endIcon: {
    height: 'fit-content',
    margin: 0,
    outline: 'none',
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    position: 'absolute',
    zIndex: 1,
    right: theme.layoutSpacing['spacing/300'],
    top: 0,
    bottom: 0,
    marginTop: 'auto',
    marginBottom: 'auto',
    cursor: 'pointer',

    '&:disabled': {
      color: theme.color[`text/onSurface${surface}/disabled` as const],
      cursor: 'default',
    },

    '&:not(:disabled):hover': {
      backgroundColor: theme.color[`bg/surface${surface}/hover` as const],
    },

    '&:not(:disabled):focus': {
      boxShadow: `0px 0px 0px 4px ${theme.color[`border/onSurface${surface}/focus` as const]}`,
    },

    '&:not(:disabled):active': {
      backgroundColor: theme.color[`bg/surface${surface}/active` as const],
    },
  },

  hasEndIcon: {
    [`&.${classes.root}`]: {
      paddingRight: `calc(${theme.layoutSpacing['spacing/500']} - 1px)`,
    },
  },

  disabled: {},
}));

export default useStyles;
