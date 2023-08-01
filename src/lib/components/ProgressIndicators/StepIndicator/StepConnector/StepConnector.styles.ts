import { makeStyles } from '../../../../../themes/core';

const useStyles = makeStyles<void, 'line'>({ name: 'StepConnector' })((theme, _, classes) => ({
  alternativeLabel: {
    top: `calc( ${theme.layoutSpacing['spacing/300']} - 1px)`,
    left: '-50%',
    right: '50%',
  },
  line: {
    borderColor: theme.color['border/onSurfaceCurrent/disabled'],
    borderTopWidth: theme.layoutSpacing['spacing/100'],
  },
  active: {
    [`& .${classes.line}`]: {
      borderColor: theme.color['bg/surfacePrimary/default'],
    },
  },
  completed: {
    [`& .${classes.line}`]: {
      borderColor: theme.color['bg/surfacePrimary/default'],
    },
  },
}));

export default useStyles;
