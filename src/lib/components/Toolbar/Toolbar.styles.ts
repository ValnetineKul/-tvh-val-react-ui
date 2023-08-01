import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Toolbar' })((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  component: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  endContainer: {
    listStyleType: 'none',
    gap: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/000']}`,
    marginBottom: theme.layoutSpacing['spacing/000'],
    marginTop: theme.layoutSpacing['spacing/000'],
    paddingLeft: theme.layoutSpacing['spacing/000'],
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
  },
  endContainerItem: {
    display: 'flex',
  },
  divider: {
    height: theme.layoutSpacing['spacing/450'],
    marginLeft: theme.layoutSpacing['spacing/400'],
    marginRight: theme.layoutSpacing['spacing/400'],
  },
}));

export default useStyles;
