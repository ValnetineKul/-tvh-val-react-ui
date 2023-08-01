import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'disabled' | 'label'>({ name: 'Checkbox' })((theme, _, classes) => ({
  root: {
    alignItems: 'flex-start',
    marginLeft: theme.layoutSpacing['spacing/000'],
    marginRight: theme.layoutSpacing['spacing/000'],
    [`&.${classes.disabled} .${classes.label}`]: {
      color: theme.color['text/onSurfaceCurrent/disabled'],
    },
  },
  checkbox: {
    padding: theme.layoutSpacing['spacing/000'],
    borderRadius: theme.borderRadius['borderRadius/round/100'],
    margin: `calc(${theme.layoutSpacing['spacing/200']} - 1px)`,
    backgroundColor: theme.color['bg/surface100/default'],
    '&:hover': {
      backgroundColor: theme.color['bg/surface100/default'],
    },
    '&:focus-within': {
      boxShadow: `0px 0px 0px 4px ${theme.color['border/onSurfaceCurrent/focus']}`,
    },
  },
  disabled: {},
  label: {
    fontSize: '100%',
    lineHeight: 1,
    marginLeft: theme.layoutSpacing['spacing/300'],
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: `calc( ${theme.layoutSpacing['spacing/400']} + 2px)`,
    height: `calc( ${theme.layoutSpacing['spacing/400']} + 2px)`,
    borderRadius: theme.borderRadius['borderRadius/round/100'],
  },
  unchecked: {
    border: `2px solid ${theme.color['border/onSurfaceCurrent/default']}`,
  },
  disabledUnchecked: {
    borderColor: theme.color['border/onSurfaceCurrent/disabled'],
    backgroundColor: theme.color['bg/disabled'],
  },
  checked: {
    color: theme.color['text/onSurfacePrimary/default'],
    backgroundColor: theme.color['bg/surfacePrimary/default'],
  },
  disabledChecked: {
    color: theme.color['text/onSurfaceCurrent/disabled'],
    backgroundColor: theme.color['bg/disabled'],
  },
}));

export default useStyles;
