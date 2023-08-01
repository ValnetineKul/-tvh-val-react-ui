import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'scrollButtons'>({ name: 'TabNavigation' })((theme, _params, classes) => ({
  root: {
    minHeight: 'unset',
    [`& .${classes.scrollButtons}`]: {
      display: 'inline-flex',
    },
  },

  tab: {
    color: theme.color['text/onSurface100/default'],
    backgroundColor: theme.color['bg/surfaceCurrent/default'],
    opacity: 1,
    textAlign: 'left',
    textTransform: 'none',
    minWidth: 'unset',
    minHeight: 'unset',
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
    position: 'relative',

    '&[aria-selected=true]': {
      zIndex: 1,
    },

    '&:focus': {
      color: theme.color['text/onSurface100/default'],
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        boxShadow: `inset 0px 0px 0px 4px ${theme.color['border/onSurface100/focus']}`,
      },
    },

    '&:hover': {
      backgroundColor: theme.color['bg/surface100/hover'],
    },

    '&:active': {
      backgroundColor: theme.color['bg/surface100/active'],
    },
  },

  tabSelected: {
    '&.Mui-selected': {
      color: theme.color['text/onSurface100/default'],
      backgroundColor: theme.color['bg/surface100/default'],

      '&:hover': {
        backgroundColor: theme.color['bg/surface100/hover'],
      },

      '&:active': {
        backgroundColor: theme.color['bg/surface100/active'],
      },
    },

    '&:before': {
      content: '""',
      width: '100%',
      height: 2,
      backgroundColor: theme.color['border/onSurfaceCurrent/selected'],
      position: 'absolute',
      left: 0,
      top: 0,
    },
  },

  tabContent: {
    padding: theme.layoutSpacing['spacing/400'],
    position: 'relative',

    '&:focus': {
      outline: 'none',
      boxShadow: `0px 0px 0px 4px ${theme.color['border/onSurface100/focus']}`,
    },
  },

  tabContainer: {
    position: 'relative',
  },

  indicator: {
    display: 'none',
  },

  bottomDivider: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },

  verticalDivider: {
    position: 'absolute',
    bottom: 0,
    height: 'calc(100% - 2px)',
  },

  verticalDividerLeft: {
    left: 0,
  },

  verticalDividerRight: {
    right: 0,
  },

  scrollButtons: {},
}));

export default useStyles;
