import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Scrim' })((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
  },

  backdropRoot: {
    position: 'absolute',
    zIndex: 1200,
    alignItems: 'unset',
    justifyContent: 'unset',
    display: 'block',
  },

  rootLight: {
    backgroundColor: theme.color['bg/backdrop/light'],
  },

  rootDark: {
    backgroundColor: theme.color['bg/backdrop/dark'],
  },
}));

export default useStyles;
