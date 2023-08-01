import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'disabled' | 'label'>({ name: 'RadioButton' })((theme, _, classes) => ({
  root: {
    alignItems: 'flex-start',
    marginLeft: theme.layoutSpacing['spacing/000'],
    marginRight: theme.layoutSpacing['spacing/000'],
    [`&.${classes.disabled} .${classes.label}`]: {
      color: theme.color['text/onSurfaceCurrent/disabled'],
    },
  },
  radio: {
    padding: theme.layoutSpacing['spacing/000'],
    margin: theme.layoutSpacing['spacing/100'],
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
    marginLeft: theme.layoutSpacing['spacing/300'],
  },
  icon: {
    width: `calc( ${theme.layoutSpacing['spacing/400']} + 4px)`,
    height: `calc( ${theme.layoutSpacing['spacing/400']} + 4px)`,
    borderRadius: `calc(${theme.borderRadius['borderRadius/circle']} / 2)`,
  },
  unchecked: {
    border: `2px solid ${theme.color['border/onSurfaceCurrent/default']}`,
  },
  disabledUnchecked: {
    borderColor: theme.color['border/onSurfaceCurrent/disabled'],
    backgroundColor: theme.color['bg/disabled'],
  },
  checkedIcon: {
    boxShadow: `inset 0px 0px 0px 2px ${theme.color['bg/surfacePrimary/default']}, inset 0px 0px 0px 5px ${theme.color['bg/surface100/default']}, inset 0px 0px 0px 10px ${theme.color['bg/surfacePrimary/default']}`,
  },
  disabledCheckedIcon: {
    boxShadow: `inset 0px 0px 0px 2px ${theme.color['bg/disabled']}, inset 0px 0px 0px 5px ${theme.color['bg/surface100/default']}, inset 0px 0px 0px 10px ${theme.color['bg/disabled']}`,
  },
}));

export default useStyles;
