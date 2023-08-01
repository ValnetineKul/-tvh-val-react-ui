import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'Video' })(() => ({
  root: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },

  container: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '56.25%', // ratio = height 9 ÷ width 16
    width: '100%',
  },

  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
  },
}));

export default useStyles;
