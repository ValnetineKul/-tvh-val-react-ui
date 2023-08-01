import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'root'>({ name: 'List' })((theme, _params, classes) => ({
  root: {
    margin: 'unset',
    paddingLeft: 20,
    maxWidth: 530,
  },

  orderedList: {},

  unorderedList: {
    [`&.${classes.root}`]: {
      listStyle: 'none',
    },
  },
}));

export default useStyles;
