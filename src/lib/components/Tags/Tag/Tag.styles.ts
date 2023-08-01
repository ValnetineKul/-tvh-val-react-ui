import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'Tag' })((theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/300']}`,
    borderRadius: theme.borderRadius['borderRadius/round/100'],
    textAlign: 'center',
  },

  colorPrimary: {
    backgroundColor: theme.color['bg/surfaceSecondary/default'],
    color: `${theme.color['text/onSurfaceSecondary/default']}`,
  },

  colorSecondary: {
    backgroundColor: theme.color['bg/surface200/default'],
    color: theme.color['text/onSurface200/default'],
  },

  icon: {
    marginRight: theme.layoutSpacing['spacing/200'],
  },
}));

export default useStyles;
