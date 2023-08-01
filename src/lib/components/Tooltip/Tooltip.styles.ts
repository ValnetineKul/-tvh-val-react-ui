import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Tooltip' })((theme) => ({
  wrapper: {
    display: 'inline-block',
  },

  tooltip: {
    backgroundColor: theme.color['bg/surfaceSecondary/default'],
    color: theme.color['text/onSurfaceSecondary/default'],
    maxWidth: 200,
    margin: theme.layoutSpacing['spacing/200'],
    padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/300']}`,
    '@media print': {
      display: 'none',
    },
  },

  horizontalPlacement: {
    margin: `0 ${theme.layoutSpacing['spacing/200']} `,
  },

  verticalPlacement: {
    margin: `${theme.layoutSpacing['spacing/200']} 0`,
  },
}));

export default useStyles;
