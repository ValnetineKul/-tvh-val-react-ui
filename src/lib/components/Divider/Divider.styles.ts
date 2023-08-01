import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Divider' })((theme) => ({
  root: {
    '@media print': {
      colorAdjust: 'exact',
    },
    background: 'none',
    borderColor: theme.color['line/onSurfaceCurrent/default'],
  },

  horizontal: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
  },
  vertical: {
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
  },
}));

export default useStyles;
