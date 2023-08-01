import { makeStyles } from '../../../../../themes/core';

const useStyles = makeStyles({ name: 'SpinnerWithBackdrop' })(() => ({
  root: { display: 'inline-block', position: 'relative' },
  spinContainerBlur: {
    opacity: 0.2,
    userSelect: 'none',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
  },
  isBackdropOpaque: {
    opacity: 0,
  },
  spin: {
    zIndex: 1,
    position: 'absolute',
    display: 'none',
  },
}));

export default useStyles;
