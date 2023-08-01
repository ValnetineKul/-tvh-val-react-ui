import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'SectionHeader' })((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  multilineRoot: {
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  subtitle: {
    marginTop: theme.layoutSpacing['spacing/300'],
  },
  title: {
    overflowWrap: 'anywhere',
  },
  actionsWrapper: {
    margin: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/450']}`,
  },
  multilineActionWrappper: {
    flex: '1 0 auto',
    width: '100%',
    margin: `${theme.layoutSpacing['spacing/400']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']}`,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      margin: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/450']}`,
    },
  },
}));

export default useStyles;
