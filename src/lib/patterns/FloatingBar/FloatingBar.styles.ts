import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'FloatingBar' })((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  floatingBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    rowGap: theme.layoutSpacing['spacing/400'],
    boxShadow: theme.shadow['shadow/500'],
    padding: theme.layoutSpacing['spacing/400'],
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  actionsWrapper: {
    [theme.breakpoints.up('md')]: {
      margin: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/450']}`,
      width: 'auto',
    },
    width: '100%',
  },
  clearSelectionWrapper: {
    display: 'flex',
  },
  divider: {
    marginLeft: theme.layoutSpacing['spacing/400'],
    marginRight: theme.layoutSpacing['spacing/400'],
  },
}));

export default useStyles;
