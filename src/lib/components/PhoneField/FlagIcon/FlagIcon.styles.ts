import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'FlagIcon' })((theme) => ({
  flag: {
    marginRight: theme.layoutSpacing['spacing/300'],
    display: 'flex',
    height: theme.layoutSpacing['spacing/400'],
    width: theme.layoutSpacing['spacing/450'],
  },
  disabled: {
    opacity: '40%',
  },
}));

export default useStyles;
