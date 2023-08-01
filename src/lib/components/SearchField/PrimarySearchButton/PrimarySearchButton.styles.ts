import type { Surface } from '../../../../themes/core';
import { makeStyles } from '../../../../themes/core';

type Props = {
  buttonColor: Surface;
};

const useStyles = makeStyles<Props, 'inner'>({ name: 'PrimarySearchButton' })((theme, { buttonColor }, classes) => ({
  sizeSm: {
    transform: 'skewX(-10deg)',
    padding: `${theme.layoutSpacing['spacing/350']} ${theme.layoutSpacing['spacing/400']}`,
    [`& .${classes.inner}`]: {
      transform: 'skewX(10deg)',
      fontSize: 0,
    },
  },

  sizeXs: {
    padding: theme.layoutSpacing['spacing/300'],
    position: 'relative',
    [`& .${classes.inner}`]: {
      position: 'relative',
      zIndex: 5,
      fontSize: 0,
    },

    '&:before': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/525']} ${theme.layoutSpacing['spacing/300']}`,
      borderColor: `transparent transparent ${theme.color[`bg/surface${buttonColor}/default` as const]} transparent`,
      top: 0,
      bottom: 0,
      left: -8,
      zIndex: 2,
    },

    '&:hover': {
      '&:before': {
        borderColor: `transparent transparent ${theme.color[`bg/surface${buttonColor}/hover` as const]} transparent`,
      },
    },

    '&:active': {
      '&:before': {
        borderColor: `transparent transparent ${theme.color[`bg/surface${buttonColor}/active` as const]} transparent`,
      },
    },

    '&:focus': {
      '&:after': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/550']} calc( ${theme.layoutSpacing['spacing/300']} + 2px)`,
        borderColor: `transparent transparent ${theme.color['border/onSurfaceCurrent/focus']} transparent`,
        top: -4,
        bottom: 0,
        left: -14,
        zIndex: 1,
      },
    },
  },

  inner: {},

  content: {
    display: 'flex',
    alignItems: 'center',
  },

  label: {
    marginLeft: theme.layoutSpacing['spacing/300'],
  },
}));

export default useStyles;
