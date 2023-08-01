import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'sortInactiveIcon' | 'innerRoot'>({ name: 'TableCell' })((theme, _, classes) => ({
  root: {
    height: 48,
    color: theme.color['text/onSurface100/default'],
    padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/400']} calc(${theme.layoutSpacing['spacing/200']} - 1px)`,
    borderBottomColor: theme.color['line/onSurface100/default'],
    verticalAlign: 'top',
  },
  head: {
    ...theme.font['screen/body500/emphasis/default'],
    color: theme.color['text/onSurface100/default'],
    textTransform: 'uppercase',
    left: 'auto',
    whiteSpace: 'nowrap',
    borderBottom: 'none',
    verticalAlign: 'middle',
    [`& .${classes.innerRoot}`]: {
      width: '100%',
      height: '100%',
    },
  },
  body: {
    ...theme.font['screen/body500/regular/default'],
  },
  stickyHeader: {
    backgroundColor: theme.color['bg/surface200/default'],
  },
  sortRoot: {
    padding: theme.layoutSpacing['spacing/000'],
  },
  sortContainer: {
    ...theme.font['screen/body500/emphasis/default'],
    textTransform: 'uppercase',
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.layoutSpacing['spacing/300'],
    padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/400']} calc(${theme.layoutSpacing['spacing/200']} - 1px)`,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',

    '&:hover': {
      [`& .${classes.sortInactiveIcon}`]: {
        opacity: 1,
      },
    },
  },
  sortContainerNumeric: {
    flexDirection: 'row-reverse',
  },
  sortInactiveIcon: {
    opacity: 0,
  },
  editField: {
    maxHeight: '32px',
  },
  innerRoot: {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '40px',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  innerRootNumeric: {
    alignItems: 'flex-end',
  },
}));

export default useStyles;
