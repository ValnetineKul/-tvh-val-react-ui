import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'CardFooter' })((theme) => ({
  root: {
    padding: theme.layoutSpacing['spacing/400'],
  },
}));

export default useStyles;
