import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'OverflowAction' })((theme) => ({
  activeIcon: {
    color: theme.color['text/onSurfaceCurrent/active'],
  },
}));

export default useStyles;
