import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'Image' })((theme) => ({
  root: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  fallback: {
    width: 'auto',
    height: 'auto',
    fill: theme.color['text/onSurfaceCurrent/disabled'],
  },
}));

export default useStyles;
