import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'CardHeader' })((theme) => ({
  root: {
    padding: theme.layoutSpacing['spacing/400'],
    color: theme.color['text/onSurfaceCurrent/default'],
  },
}));

export default useStyles;
