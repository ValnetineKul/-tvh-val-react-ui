import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'CardImage' })(() => ({
  directionHorizontal: {
    width: 0,
    paddingLeft: '43.75%',
  },
  directionVertical: {
    height: 0,
    paddingTop: '56.25%',
  },
  sizeContain: {
    backgroundSize: 'contain',
  },
  sizeCover: {
    backgroundSize: 'cover',
  },
}));

export default useStyles;
