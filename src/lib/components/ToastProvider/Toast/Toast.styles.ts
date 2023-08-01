import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'spinner'>({ name: 'ToastMessage' })((theme, _params, classes) => ({
  root: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.layoutSpacing['spacing/300'],
    borderRadius: theme.borderRadius['borderRadius/round/100'],
    boxShadow: theme.shadow['shadow/400'],
    [`& .${classes.spinner}`]: {
      color: theme.color['icon/info'],
    },
    [theme.breakpoints.up('sm')]: {
      width: 360,
      padding: theme.layoutSpacing['spacing/400'],
    },
  },
  actionButton: {
    whiteSpace: 'nowrap',
  },
  surfaceActionButton: {
    marginTop: theme.layoutSpacing['spacing/200'],
    marginLeft: theme.layoutSpacing['spacing/500'],
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.layoutSpacing['spacing/300'],
    },
  },
  spinner: {},
}));

export default useStyles;
