import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'ErrorPage' })((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.layoutSpacing['spacing/450']} ${theme.layoutSpacing['spacing/000']}`,
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: `${theme.layoutSpacing['spacing/500']} ${theme.layoutSpacing['spacing/000']}`,
    },
  },
  contentWrapper: {
    [theme.breakpoints.up('sm')]: {
      width: '64%',
      paddingRight: theme.layoutSpacing['spacing/450'],
    },
  },
  imageWrapper: {
    [theme.breakpoints.up('sm')]: {
      width: '36%',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  displayBlock: {
    display: 'block',
  },
  header: {
    marginBottom: theme.layoutSpacing['spacing/450'],
  },
  description: {
    marginBottom: theme.layoutSpacing['spacing/300'],
  },
  errorCode: {
    marginBottom: theme.layoutSpacing['spacing/300'],
  },
  options: {
    margin: `${theme.layoutSpacing['spacing/450']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/400']}`,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.layoutSpacing['spacing/500'],
    },
  },
  links: {
    listStyleType: 'none',
    margin: theme.layoutSpacing['spacing/000'],
    padding: theme.layoutSpacing['spacing/000'],
  },
  listItem: {
    marginBottom: theme.layoutSpacing['spacing/300'],
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

export default useStyles;
