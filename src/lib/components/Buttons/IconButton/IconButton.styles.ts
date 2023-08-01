import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'IconButton' })((theme) => ({
  root: {
    color: theme.color['icon/onSurfaceCurrent/default'],
    padding: theme.layoutSpacing['spacing/200'],
    borderRadius: theme.borderRadius['borderRadius/none'],
    backgroundColor: 'transparent',
    '&:not(:disabled):hover': {
      backgroundColor: theme.color['bg/surfaceCurrent/hover'],
    },
    '&:not(:disabled):active': {
      backgroundColor: theme.color['bg/surfaceCurrent/active'],
    },
  },
}));

export default useStyles;
