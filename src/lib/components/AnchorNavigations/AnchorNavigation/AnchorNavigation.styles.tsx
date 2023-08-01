import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<{ offset: number }>({ name: 'AnchorNavigation' })((theme, { offset }) => ({
  root: {
    position: 'sticky',
    top: `${offset}px`,
    zIndex: 10,
  },
  anchorList: {
    minHeight: 'auto',
    width: '100%',
  },
  indicator: {
    display: 'none',
  },
  iconButton: {
    padding: 0,
    '&:focus': {
      outline: 'none',
    },
  },
  anchorComponent: {
    paddingTop: theme.layoutSpacing['spacing/450'],
    paddingBottom: theme.layoutSpacing['spacing/450'],
  },
  header: {
    marginBottom: theme.layoutSpacing['spacing/400'],
  },
}));

export default useStyles;
