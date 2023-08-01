import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'RadioButtonGroup' })((theme) => ({
  root: {
    '& label': {
      marginBottom: theme.layoutSpacing['spacing/300'],
      '&:last-child': {
        marginBottom: theme.layoutSpacing['spacing/000'],
      },
    },
  },
  label: {
    display: 'inline-block',
    color: theme.color['text/onSurfaceCurrent/default'],
    marginBottom: theme.layoutSpacing['spacing/300'],
  },
  asterisk: {
    color: theme.color['text/onSurfaceCurrent/error'],
  },
}));

export default useStyles;
