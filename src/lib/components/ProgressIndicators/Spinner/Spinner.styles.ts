import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'Spinner' })((theme) => ({
  spinnerWrapper: {
    display: 'flex',
  },
  spinner: {
    color: theme.color['accents/onSurfaceCurrent/primary/default'],
  },
}));

export default useStyles;
