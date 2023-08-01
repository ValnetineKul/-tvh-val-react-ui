import { makeStyles } from '../../../themes/core';

type Props = {
  rightShadowOffset: number;
  verticalOffset: number;
};

const useStyles = makeStyles<Props>({ name: 'Table' })((_, { rightShadowOffset, verticalOffset }) => ({
  root: {
    borderCollapse: 'separate',
  },
  headerShadow: {
    position: 'sticky',
    zIndex: 4,
    boxShadow: '0 8px 8px rgb(0 0 0 / 8%)',
    top: 0,
    left: 0,
    height: 48,
    width: '100%',
    marginTop: '-48px',
  },
  disabledStickyHeaderShadow: {
    top: -48,
  },
  verticalShadow: {
    position: 'sticky',
    zIndex: 3,
    top: 0,
    height: `${verticalOffset}px`,
    width: 1,
    marginTop: `-${verticalOffset}px`,
  },
  startShadow: {
    boxShadow: '4px 0 8px 6px rgb(0 0 0 / 8%);',
    left: '-1px',
  },
  endShadow: {
    boxShadow: '-4px 0 8px 6px rgb(0 0 0 / 8%);',
    left: `calc(${rightShadowOffset}px + 1px)`,
  },
}));

export default useStyles;
