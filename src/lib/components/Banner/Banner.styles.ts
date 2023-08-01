import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<
  void,
  'directionVertical' | 'directionHorizontal' | 'banner' | 'actionButton' | 'icon' | 'messageBoxHorizontal'
>({ name: 'Banner' })((theme, _, classes) => ({
  root: {
    [`&.${classes.directionHorizontal} .${classes.messageBoxHorizontal}`]: {
      display: 'flex',
      flex: 'auto',
      justifyContent: 'space-between',
    },
  },
  directionVertical: {},
  directionHorizontal: {},
  icon: {
    padding: theme.layoutSpacing['spacing/000'],
    opacity: 1,
    marginRight: theme.layoutSpacing['spacing/300'],
  },
  banner: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']} !important`,
    borderRadius: 'inherit',
  },
  bannerMultiline: {
    [theme.breakpoints.up('xs')]: {
      alignItems: 'flex-start',
    },
  },
  message: {
    paddingBottom: theme.layoutSpacing['spacing/000'],
    display: 'flex',
    flex: 1,
  },
  messageBox: {
    [`& .${classes.actionButton}`]: {
      marginTop: theme.layoutSpacing['spacing/300'],
    },
  },
  messageBoxHorizontal: {},
  action: {
    gap: theme.layoutSpacing['spacing/300'],
  },
  actionButton: {},
  typography: {
    alignSelf: 'center',
    wordBreak: 'break-word',
    marginBottom: theme.layoutSpacing['spacing/200'],
  },
  fullWidth: {
    width: '100%',
  },
  surface: {
    borderRadius: theme.borderRadius['borderRadius/round/100'],
  },
}));

export default useStyles;
