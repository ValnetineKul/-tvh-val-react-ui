import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Avatar' })((theme) => ({
  root: {
    borderRadius: theme.borderRadius['borderRadius/circle'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sizeXs: {
    height: 24,
    width: 24,
  },
  sizeSm: {
    height: 40,
    width: 40,
  },
  sizeMd: {
    height: 80,
    width: 80,
  },
  sizeLg: {
    height: 128,
    width: 128,
  },
  image: {
    height: '100%',
  },
}));

export default useStyles;
