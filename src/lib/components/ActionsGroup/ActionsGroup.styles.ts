import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'ActionsGroup' })((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    margin: 0,
    padding: 0,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.layoutSpacing['spacing/400'],
  },

  reversedList: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },

  startAlinment: {
    justifyContent: 'flex-start',
  },

  actionWrapper: {
    listStyle: 'none',
  },

  buttonWrapperMobile: {
    width: '100%',
  },

  lastButtonWrapperMobile: {
    flex: '1 1',
  },
}));

export default useStyles;
