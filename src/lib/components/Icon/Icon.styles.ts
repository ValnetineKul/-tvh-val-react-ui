import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Icon' })(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeXl: {
    fontSize: '64px !important',
    width: '80px',
    height: '80px',
    '& svg': {
      width: '80px',
      height: '80px',
    },
  },
  sizeMd: {
    fontSize: '19px !important',
    width: '24px',
    height: '24px',
    '& svg': {
      width: '24px',
      height: '24px',
    },
  },
  sizeSm: {
    fontSize: '12px !important',
    width: '16px',
    height: '16px',
    '& svg': {
      width: '16px',
      height: '16px',
    },
  },
}));

export default useStyles;
