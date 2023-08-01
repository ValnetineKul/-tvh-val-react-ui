import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'PageHeader' })((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    rowGap: theme.layoutSpacing['spacing/400'],
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
  titleWithTag: {
    marginRight: theme.layoutSpacing['spacing/400'],
    display: 'inline',
  },
  titleWrapper: {
    display: 'flex',
  },
  tagWrapper: {
    display: 'inline-flex',
    textTransform: 'none',
    fontStyle: 'normal',
    verticalAlign: 'super',
  },
  tagWrapperComercial: {
    marginTop: theme.layoutSpacing['spacing/000'],
  },
  actionsWrapper: {
    flex: '1 0 auto',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      margin: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/450']}`,
    },
  },
}));

export default useStyles;
