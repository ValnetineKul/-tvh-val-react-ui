import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'DrawerHeader' })((theme) => ({
  root: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
    paddingLeft: theme.layoutSpacing['spacing/400'],
    paddingRight: theme.layoutSpacing['spacing/400'],
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  headingWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 32px)',
  },
  heading: {
    marginLeft: theme.layoutSpacing['spacing/300'],
  },
  truncatedHeading: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

export default useStyles;
