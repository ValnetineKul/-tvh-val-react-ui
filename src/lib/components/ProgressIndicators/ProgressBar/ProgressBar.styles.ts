import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'ProgressBar' })((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  progressBar: {
    background: theme.color['bg/surface200/default'],
    borderRadius: 4,
    height: 8,
    flex: '1 1 auto',
    '& .MuiLinearProgress-barColorPrimary': {
      background: theme.color['bg/surfacePrimary/default'],
      borderRadius: 4,
    },
  },
  endLabel: {
    marginLeft: theme.layoutSpacing['spacing/300'],
  },
}));

export default useStyles;
