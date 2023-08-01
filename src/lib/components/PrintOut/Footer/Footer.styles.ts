import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'Footer' })((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: theme.color['bg/surfacePrimary/default'],
  },
  logo: {
    width: 'auto',
    height: 21,
  },
}));

export default useStyles;
