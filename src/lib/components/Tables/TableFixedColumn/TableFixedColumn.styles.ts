import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'TableFixedColumn' })((theme) => ({
  root: {
    position: 'sticky',
    backgroundColor: theme.color['bg/surfaceCurrent/default'],
    zIndex: 3,
    'th&': {
      zIndex: 4,
      backgroundColor: theme.color['bg/surface200/default'],
    },
  },
  start: {
    boxShadow: '8px 0 8px rgba(0, 0, 0, 0.08) !important',
  },
  end: {
    boxShadow: '-8px 0 8px rgba(0, 0, 0, 0.08) !important',
  },
}));

export default useStyles;
