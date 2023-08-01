import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'DialogContent' })((theme) => ({
  root: {
    color: theme.color['text/onSurface100/default'],
    padding: theme.layoutSpacing['spacing/400'],
  },
}));

export default useStyles;
