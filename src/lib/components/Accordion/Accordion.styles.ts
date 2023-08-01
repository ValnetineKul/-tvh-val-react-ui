import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'expanded'>({ name: 'Accordion' })((theme, _params, classes) => ({
  itemRoot: {
    boxShadow: 'none',
    transition: 'auto',
    '&:before': {
      content: 'none',
    },
  },

  expanded: {
    [`&.${classes.expanded}`]: {
      margin: theme.layoutSpacing['spacing/000'],
    },
  },

  contentRoot: {
    transition: 'auto',
    padding: theme.layoutSpacing['spacing/400'],

    '& > div:first-of-type': {
      width: '100%',
    },
  },

  textContentRoot: {
    maxWidth: `calc(600px + ${theme.layoutSpacing['spacing/500']})`,
  },
}));

export default useStyles;
