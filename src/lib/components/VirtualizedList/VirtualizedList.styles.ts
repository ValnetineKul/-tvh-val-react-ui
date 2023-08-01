import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'VirtualizedList' })((theme) => ({
  root: {
    '& ul': {
      listStyle: 'none',
      padding: theme.layoutSpacing['spacing/000'],
      margin: theme.layoutSpacing['spacing/000'],
    },
  },

  autosizer: {
    width: '100%',
    height: '100%',
  },

  row: {
    width: '100%',
  },
}));

export default useStyles;
