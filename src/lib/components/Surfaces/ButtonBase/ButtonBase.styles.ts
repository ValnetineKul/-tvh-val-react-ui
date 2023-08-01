import type { Surface } from '../../../../themes/core';
import { makeStyles } from '../../../../themes/core';

type Props = {
  surface: Surface;
};

const useStyles = makeStyles<Props>({ name: 'ButtonBase' })((theme, { surface }) => ({
  root: {
    cursor: 'pointer',
    backgroundColor: theme.color[`bg/surface${surface}/default` as const],
    color: theme.color[`text/onSurface${surface}/default` as const],

    '&:focus-within': {
      outline: 'none',
    },
    '&:not(:disabled):hover': {
      backgroundColor: theme.color[`bg/surface${surface}/hover` as const],
      color: theme.color[`text/onSurface${surface}/default` as const],
    },
    '&:not(:disabled):focus': {
      color: theme.color[`text/onSurface${surface}/default` as const],
    },
    '&:not(:disabled):active': {
      backgroundColor: theme.color[`bg/surface${surface}/active` as const],
      color: theme.color[`text/onSurface${surface}/active` as const],
    },
    '&:disabled': {
      cursor: 'default',
      color: theme.color[`text/onSurface${surface}/disabled` as const],
    },
  },

  focusOut: {
    '&:not(:disabled):focus, &:not(:disabled):focus-within': {
      boxShadow: `0px 0px 0px 4px ${theme.color['border/onSurfaceCurrent/focus']}`,
    },
  },
  focusInset: {
    '&:not(:disabled):focus, &:not(:disabled):focus-within': {
      boxShadow: `inset 0px 0px 0px 4px ${theme.color[`border/onSurface${surface}/focus` as const]}`,
    },
  },
  border: {
    border: '1px solid',
    borderColor: theme.color[`border/onSurface${surface}/default` as const],
    '&:disabled': {
      borderColor: theme.color[`border/onSurface${surface}/disabled` as const],
    },
  },
}));

export default useStyles;
