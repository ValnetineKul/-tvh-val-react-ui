import { makeStyles } from '../../../../themes/core';

const SMALL_WIDTH = 300;
const MEDIUM_WIDTH = 600;
const LARGE_WIDTH = 1224;

const useStyles = makeStyles({ name: 'Modal' })((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: 1200,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.layoutSpacing['spacing/400'],
    },
  },
  titleText: {
    marginRight: 'auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  backdrop: {
    position: 'fixed',
    zIndex: '-1',
  },
  paper: {
    width: '100%',
    margin: theme.layoutSpacing['spacing/000'],
    boxShadow: theme.shadow['shadow/500'],
    [theme.breakpoints.up('sm')]: {
      maxWidth: '100%',
      minHeight: 186,
      maxHeight: '90vh',
      marginTop: theme.layoutSpacing['spacing/000'],
    },
  },
  sizeSm: {
    [theme.breakpoints.up('sm')]: {
      width: SMALL_WIDTH,
    },
  },
  sizeMd: {
    [theme.breakpoints.up('md')]: {
      width: MEDIUM_WIDTH,
    },
  },
  sizeLg: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: LARGE_WIDTH,
      marginLeft: theme.layoutSpacing['spacing/450'],
      marginRight: theme.layoutSpacing['spacing/450'],
    },
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
  },
}));

export default useStyles;
