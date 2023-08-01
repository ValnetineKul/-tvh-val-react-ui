import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Card' })((theme) => ({
  hasHover: {
    '&:hover': {
      cursor: 'pointer',
      boxShadow: theme.shadow['shadow/400'],
    },
    '&:focus': {
      outline: 0,
      boxShadow: `0px 0px 0px 4px ${theme.color['border/onSurfaceCurrent/focus']}`,
    },
  },
  root: {
    display: 'flex',
    overflow: 'visible',
  },
  rootHorizontal: {
    width: '100%',
  },
  rootVertical: {
    flexDirection: 'column',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  visuallyHidden: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
    padding: theme.layoutSpacing['spacing/000'],
    border: 'none',
  },
}));

export default useStyles;
