import { makeStyles } from '../../../../themes/core';

type Props = {
  withIcon: boolean;
};

const useStyles = makeStyles<Props>({ name: 'CallToActionButton' })((theme, { withIcon }) => ({
  root: {
    transform: 'skewX(-10deg)',
    minHeight: 40,
    display: 'inline-flex',
    alignItems: 'center',
    // we need exactly 4px to compensate the skewX(10deg) with 40 height
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/200']}`,
    '&:disabled': {
      backgroundColor: theme.color['bg/disabled'],
      color: theme.color['text/onSurfaceCurrent/disabled'],
    },
  },
  inner: {
    transform: 'skewX(10deg)',
    display: 'flex',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/400']}`,
  },
  iconOnly: {
    padding: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/300']}`,
  },
  label: {
    marginLeft: withIcon ? theme.layoutSpacing['spacing/300'] : theme.layoutSpacing['spacing/000'],
  },
}));

export default useStyles;
