import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'TableHead' })((theme) => ({
  root: {
    backgroundColor: theme.color['bg/surface200/default'],
  },
}));

export default useStyles;
