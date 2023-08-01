import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'SplitButton' })((theme) => ({
  root: {
    display: 'inline-flex',
  },
  fullWidth: {
    display: 'flex',
  },
  button: {
    width: 'auto',
    paddingLeft: theme.layoutSpacing['spacing/300'],
    paddingRight: theme.layoutSpacing['spacing/300'],
  },

  divider: {
    height: '100%',
  },
}));

export default useStyles;
