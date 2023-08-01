import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Pagination' })((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column-reverse',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flexFlow: 'row',
    },
  },
  list: {
    '& li': {
      display: 'flex',
    },
    '& li > div': {
      marginRight: theme.layoutSpacing['spacing/300'],
    },
    '& li:last-child > div': {
      marginRight: theme.layoutSpacing['spacing/000'],
    },
  },
  itemsPerPage: {
    marginTop: theme.layoutSpacing['spacing/300'],
    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
      marginRight: 'auto',
    },
  },
}));

export default useStyles;
