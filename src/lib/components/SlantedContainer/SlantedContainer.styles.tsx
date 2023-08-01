import { makeStyles } from '../../../themes/core';

type Props = {
  slantOffset: number;
};

const useStyles = makeStyles<Props>({ name: 'SlantedContainer' })((theme, { slantOffset }) => ({
  root: {
    display: 'flex',
  },
  innerRoot: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  skewedStart: {
    '&:before': {
      content: '""',
      height: '100%',
      backgroundColor: 'inherit',
      transform: 'skewX(-10deg)',
      width: '80%',
      zIndex: -1,
      position: 'absolute',
      left: -slantOffset,
    },
  },
  skewedEnd: {
    '&:after': {
      content: '""',
      height: '100%',
      width: '80%',
      zIndex: -1,
      position: 'absolute',
      backgroundColor: 'inherit',
      transform: 'skewX(-10deg)',
      right: -slantOffset,
    },
  },
  paddingNone: {
    padding: theme.layoutSpacing['spacing/000'],
  },
  padding200: {
    padding: theme.layoutSpacing['spacing/200'],
  },
  padding300: {
    padding: theme.layoutSpacing['spacing/300'],
  },
}));

export default useStyles;
