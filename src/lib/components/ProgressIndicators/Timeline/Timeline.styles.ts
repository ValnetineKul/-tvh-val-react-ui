import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles({ name: 'Timeline' })((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  rootHorizontal: {
    flexFlow: 'row',
  },
  rootVertical: {
    flexFlow: 'column',
    paddingLeft: theme.layoutSpacing['spacing/100'],
  },
  rootAlteringHorizontal: {
    alignItems: 'baseline',
  },
  itemRoot: {
    flex: '1',
    position: 'relative',
  },
  itemRootAlteringHorizontal: {
    display: 'flex',
  },
  itemRootAlteringVertical: {
    display: 'flex',

    '&:before': {
      content: "''",
      flex: 1,
      marginLeft: `calc(-${theme.layoutSpacing['spacing/400']} - ${theme.layoutSpacing['spacing/100']})`,
    },
  },
  itemRootReversedVertical: {
    flexFlow: 'row-reverse',
  },
  itemAltering: {
    flex: 1,
  },
}));

export default useStyles;
