import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'DialogFooter' })((theme) => ({
  wrapper: {
    display: 'block',
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    margin: theme.layoutSpacing['spacing/000'],
    padding: theme.layoutSpacing['spacing/000'],
  },
  directionHorizontal: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  directionVertical: {
    flexDirection: 'column',
  },
  listItem: {
    margin: theme.layoutSpacing['spacing/300'],
  },
  alternativeActionHorizontal: {
    marginRight: 'auto',
    marginLeft: theme.layoutSpacing['spacing/300'],
    display: 'flex',
    alignItems: 'center',
  },
  alternativeActionVertical: {
    display: 'flex',
    margin: theme.layoutSpacing['spacing/300'],
    justifyContent: 'center',
  },
}));

export default useStyles;
