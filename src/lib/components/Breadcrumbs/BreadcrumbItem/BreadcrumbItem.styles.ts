import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'BreadcrumbItem' })((theme) => ({
  buttonBase: {
    backgroundColor: 'transparent',
    color: theme.color['text/onSurfaceCurrent/default'],
    '&:not(:disabled):hover, &:not(:disabled):focus, &:not(:disabled):active': {
      color: theme.color['text/onSurfaceCurrent/default'],
    },
  },
  hierarchicalPage: {
    textDecoration: 'underline',
  },
  currentPage: {
    color: theme.color['text/onSurfaceCurrent/secondary'],
  },
  visuallyHidden: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
  },
}));

export default useStyles;
