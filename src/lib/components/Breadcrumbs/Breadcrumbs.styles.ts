import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Breadcrumbs' })((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  back: {
    alignSelf: 'start',
    whiteSpace: 'nowrap',
  },
  surfaceBack: {
    marginRight: theme.layoutSpacing['spacing/350'],
  },
  separator: {
    color: theme.color['icon/onSurfaceCurrent/default'],
  },
  verticalAligment: {
    lineHeight: 0,
  },
}));

export default useStyles;
