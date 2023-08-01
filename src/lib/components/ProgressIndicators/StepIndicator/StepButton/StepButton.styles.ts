import { makeStyles } from '../../../../../themes/core';

const useStyles = makeStyles<void, 'icon' | 'disapledIcon' | 'label' | 'alternativeLabel' | 'hiddenLabel'>({
  name: 'StepButton',
})((theme, _, classes) => ({
  icon: {
    display: 'flex',
    justifyContent: 'center',
    width: `calc( ${theme.layoutSpacing['spacing/400']} + 3px)`,
    height: theme.layoutSpacing['spacing/400'],
    transform: 'skewX(-10deg)',
  },
  disapledIcon: {
    backgroundColor: theme.color['bg/disabled'],
  },
  stepButton: {
    padding: theme.layoutSpacing['spacing/000'],
    margin: theme.layoutSpacing['spacing/000'],
    '&:hover': {
      [`& .${classes.icon}`]: {
        backgroundColor: theme.color['bg/surfacePrimary/hover'],
      },
      [`& .${classes.label}`]: {
        textDecoration: 'underline',
      },
    },
    '&:focus': {
      [`& .${classes.icon}`]: {
        boxShadow: `0px 0px 0px 4px ${theme.color['border/onSurfaceCurrent/focus']}`,
      },
    },
  },
  label: {
    minWidth: 0,
  },
  iconContainer: {
    position: 'relative',
    zIndex: 10,
  },
  labelContainer: {
    minWidth: 0,
    [`& .${classes.alternativeLabel}`]: {
      marginTop: theme.layoutSpacing['spacing/200'],
    },
  },
  rootLabel: {
    minWidth: 0,
  },
  truncatedLabel: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    [`&.${classes.hiddenLabel}`]: {
      display: 'flex',
      paddingBottom: theme.layoutSpacing['spacing/200'],
      marginBottom: `-${theme.layoutSpacing['spacing/200']}`,
    },
  },
  tooltip: {
    paddingTop: theme.layoutSpacing['spacing/200'],
    marginTop: `-${theme.layoutSpacing['spacing/200']}`,
  },
  alternativeLabel: {},
  hiddenLabel: {},
}));

export default useStyles;
