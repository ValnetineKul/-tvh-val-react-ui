import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'CardContent' })((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.layoutSpacing['spacing/400'],
    '&:last-child': {
      paddingBottom: theme.layoutSpacing['spacing/400'],
    },
    color: theme.color['text/onSurfaceCurrent/default'],
  },
}));

export default useStyles;
