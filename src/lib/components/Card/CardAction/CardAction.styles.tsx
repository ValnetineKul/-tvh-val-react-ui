import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'CardAction' })((theme) => ({
  root: {
    display: 'inline-block',
    padding: theme.layoutSpacing['spacing/000'],
  },
}));

export default useStyles;
