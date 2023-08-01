import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'GrisVisualizer' })((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    position: 'absolute',
    width: '100%',
    height: '100vh',
    gap: theme.layoutSpacing['spacing/400'],
    [theme.breakpoints.up('sm')]: {
      gap: theme.layoutSpacing['spacing/450'],
    },
  },
  item: {
    backgroundColor: 'rgba(7, 0, 255, 0.07)',
  },
}));

export default useStyles;
