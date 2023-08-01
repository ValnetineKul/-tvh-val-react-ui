import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'TextArea' })((theme) => ({
  root: {
    padding: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} !important`,
  },
  input: {
    padding: `20px ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/300']} !important`,
  },
}));

export default useStyles;
