import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'Navigation' })((theme) => ({
  root: {},
  list: {
    paddingTop: theme.layoutSpacing['spacing/000'],
    paddingBottom: theme.layoutSpacing['spacing/000'],
  },
}));

export default useStyles;
