import { makeStyles } from '../../../../../themes/core';

const useStyles = makeStyles<void, 'loading' | 'warning' | 'selected'>({ name: 'PasteToUploadItem' })(
  (theme, _params, classes) => ({
    surface: {
      position: 'relative',
      width: '100%',
      height: '100%',
      border: `1px solid ${theme.color[`border/onSurfaceCurrent/default`]} `,
      [`&.${classes.loading}`]: {
        borderStyle: 'dashed',
      },
      [`&.${classes.warning}`]: {
        borderColor: theme.color['border/onSurfaceCurrent/error'],
      },
      [`&.${classes.selected}`]: {
        borderColor: theme.color['border/onSurfaceCurrent/selected'],
      },
    },

    imageWrapper: {
      width: '100%',
      height: '100%',
      [`.${classes.loading} &`]: {
        padding: theme.layoutSpacing['spacing/200'],
      },
      [`.${classes.warning} &`]: {
        padding: theme.layoutSpacing['spacing/200'],
      },
    },

    image: {
      width: '100%',
      height: '100%',
      aspectRatio: '16 / 9',
      objectFit: 'cover',
    },

    fallbackIcon: {
      '& svg': {
        color: theme.color[`icon/onSurfaceDefault/action/default`],
      },
    },

    deleteImageIcon: {
      position: 'absolute',
      top: 1,
      right: 1,
    },

    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.layoutSpacing['spacing/200'],
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      height: '100%',
      width: '100%',
    },

    warningLabel: {
      color: theme.color['text/onSurfaceCurrent/error'],
    },

    loading: {},
    warning: {},
    selected: {},
  })
);

export default useStyles;
