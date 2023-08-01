import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<
  void,
  | 'selected'
  | 'hasTwoColumns'
  | 'fullWidth'
  | 'imageWrapper'
  | 'label'
  | 'hasTitleAndLabel'
  | 'imagePadding'
  | 'fallbackImage'
>({ name: 'ChoiceChip' })((theme, _, classes) => ({
  root: {
    borderRadius: theme.borderRadius['borderRadius/round/100'],
    overflow: 'hidden',
    [`&.${classes.selected}`]: {
      borderColor: theme.color['border/onSurfaceCurrent/selected'],
    },
    '&:disabled': {
      backgroundColor: theme.color['bg/disabled'],
      [`& .${classes.imageWrapper}`]: {
        opacity: 0.4,
      },
    },
    '&:active': {
      [`& .${classes.fallbackImage}`]: {
        filter: 'invert(1)',
      },
    },
    [`&.${classes.hasTwoColumns}`]: {
      [`&.${classes.fullWidth}`]: {
        gridTemplateColumns: '1fr 1fr',
      },
      [`& .${classes.imageWrapper}`]: {
        paddingRight: theme.layoutSpacing['spacing/300'],
      },
      [`& .${classes.label}`]: {
        textAlign: 'left',
        paddingLeft: theme.layoutSpacing['spacing/300'],
      },
    },
    [`&.${classes.hasTitleAndLabel}`]: {
      [`& .${classes.imageWrapper}`]: {
        height: 64,
      },
    },
  },
  imageWrapper: {
    padding: theme.layoutSpacing['spacing/000'],
    height: 40,
    display: 'flex',
    alignItems: 'center',
    maxWidth: 110,
    minWidth: 40,
    [`&.${classes.imagePadding}`]: {
      padding: `calc( ${theme.layoutSpacing['spacing/300']} - 1px)`,
    },
  },
  labelWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  label: {
    padding: `calc( ${theme.layoutSpacing['spacing/300']} - 1px)`,
  },
  fullWidth: {
    width: '100%',
    display: 'inline-grid',
    gridTemplateColumns: '1fr',
    [`& .${classes.imageWrapper}`]: {
      maxWidth: 180,
      minWidth: 64,
    },
  },
  selected: {},
  imagePadding: {},
  hasTwoColumns: {},
  hasTitleAndLabel: {},
  fallbackImage: {
    fill: 'currentColor',
  },
}));

export default useStyles;
