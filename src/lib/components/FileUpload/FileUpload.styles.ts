import type { Surface } from '../../../themes/core';
import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<
  { surface: Surface },
  'fullWidth' | 'disabled' | 'root' | 'main' | 'required' | 'secondaryText' | 'icon'
>({
  name: 'FileUpload',
})((theme, { surface }, classes) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    display: 'inline-block',

    [`&.${classes.fullWidth}`]: {
      maxWidth: '100%',
    },
  },

  label: {
    marginBottom: theme.layoutSpacing['spacing/200'],
  },

  main: {
    display: 'block',
    position: 'relative',
    borderStyle: 'dashed',
    padding: theme.layoutSpacing['spacing/300'],
    textAlign: 'center',

    '&:hover': {
      [`.${classes.root}:not(.${classes.disabled}) &`]: {
        borderStyle: 'solid',
      },
    },
  },
  hasError: {
    marginBottom: theme.layoutSpacing['spacing/200'],

    [`.${classes.root}:not(.${classes.disabled}) &`]: {
      backgroundColor: theme.color['bg/error/input'],
      border: `1px solid ${theme.color['border/onSurfaceCurrent/error']}`,
    },
  },

  input: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0,

    [`.${classes.root}:not(.${classes.disabled}) &`]: {
      cursor: 'pointer',
    },
  },

  basicInput: {
    width: 0,
    height: 0,
  },

  icon: {
    display: 'inline-block',
    color: theme.color[`icon/onSurface${surface}/default` as const],
  },

  required: {
    color: theme.color['text/onSurfaceCurrent/error'],
  },

  block: {
    marginBottom: theme.layoutSpacing['spacing/300'],
  },

  disabled: {
    color: theme.color[`text/onSurface${surface}/disabled` as const],

    [`& .${classes.main}`]: {
      backgroundColor: theme.color['bg/disabled'],
      border: `1px solid ${theme.color['bg/disabled']}`,
      color: theme.color[`text/onSurface${surface}/disabled` as const],
    },

    [`& .${classes.secondaryText}, & .${classes.icon}, & .${classes.required}`]: {
      color: 'currentcolor',
    },
  },

  errorMessage: {
    marginBottom: theme.layoutSpacing['spacing/300'],
  },

  item: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',
    gap: theme.layoutSpacing['spacing/100'],
    backgroundColor: theme.color['bg/surface150/default'],
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
    marginTop: theme.layoutSpacing['spacing/300'],
    alignItems: 'center',
  },

  basicErrorMessage: {
    marginTop: theme.layoutSpacing['spacing/300'],
  },

  basicFileInfo: {
    marginBottom: theme.layoutSpacing['spacing/300'],
  },

  secondaryText: {},
  fullWidth: {},
}));

export default useStyles;
