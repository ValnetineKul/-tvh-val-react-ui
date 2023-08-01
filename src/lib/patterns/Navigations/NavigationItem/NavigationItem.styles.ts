import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'selected' | 'horizontalButtonBase'>({ name: 'App' })((theme, _, classes) => ({
  horizontalItem: {
    '&[role=menuitem]': {
      display: 'inline-flex',
    },

    [`& .${classes.horizontalButtonBase}`]: {
      minWidth: 'auto',
      minHeight: 'auto',
      padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
      '&>*': {
        marginRight: theme.layoutSpacing['spacing/000'],
      },

      flexDirection: 'column',
      alignItems: 'center',
      '&:focus': {
        background: 'transparent',
      },
    },

    [`&.${classes.selected}`]: {
      '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 2,
        background: theme.color['border/onSurfaceCurrent/selected'],
        zIndex: 1,
      },
    },
  },

  verticalItem: {
    position: 'relative',

    [`&.${classes.selected}`]: {
      '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: 4,
        background: theme.color['border/onSurfaceCurrent/selected'],
        zIndex: 1,
      },
    },
  },

  selected: {},
  horizontalButtonBase: {},
}));

export default useStyles;
