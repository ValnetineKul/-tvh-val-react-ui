import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'ListLayout' })((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: { marginBottom: theme.layoutSpacing['spacing/400'] },
  table: { marginBottom: theme.layoutSpacing['spacing/400'] },
}));

export default useStyles;
