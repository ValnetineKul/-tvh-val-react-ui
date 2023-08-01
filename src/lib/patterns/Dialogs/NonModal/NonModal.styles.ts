import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'NonModal' })((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 1500,
    boxShadow: theme.shadow['shadow/500'],
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  positionBottomStart: {
    left: theme.layoutSpacing['spacing/000'],
    bottom: theme.layoutSpacing['spacing/450'],
    [theme.breakpoints.down('sm')]: {
      bottom: theme.layoutSpacing['spacing/000'],
    },
  },
  positionBottomEnd: {
    right: theme.layoutSpacing['spacing/000'],
    bottom: theme.layoutSpacing['spacing/450'],
    [theme.breakpoints.down('sm')]: {
      bottom: theme.layoutSpacing['spacing/000'],
    },
  },
  title: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
      padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/400']}`,
    },
  },
  titleText: {
    whiteSpace: 'break-spaces',
    marginTop: theme.layoutSpacing['spacing/200'],
  },
  children: {
    padding: theme.layoutSpacing['spacing/400'],
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
}));

export default useStyles;
