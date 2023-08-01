import type { Surface } from '../../../../themes/core';
import { makeStyles } from '../../../../themes/core';

const borderSize = '1px';
const outlineSize = '4px';

type Props = {
  variantColor: Surface;
};

const useStyles = makeStyles<
  Props,
  'tertiaryButtonBackdrop' | 'tertiaryButton' | 'variantLink' | 'linkTypeDefault' | 'linkTypePrimary'
>({ name: 'Button' })((theme, { variantColor }, classes) => ({
  surface: {
    display: 'inline-flex',
  },

  root: {
    minWidth: 'auto',
    textTransform: 'none',
    borderRadius: theme.borderRadius['borderRadius/none'],
    // theme.font[] is used instead of Typography to avoid performance issue in ecommerce
    ...theme.font['screen/body500/regular/default'],
    '&:focus': {
      boxShadow: `0px 0px 0px ${outlineSize} ${theme.color['border/onSurfaceCurrent/focus']}`,
    },
    '&:disabled': {
      backgroundColor: theme.color['bg/disabled'],
      color: theme.color['text/onSurfaceCurrent/disabled'],
      [`&.${classes.tertiaryButton}`]: {
        backgroundColor: 'transparent',
      },
      [`.${classes.tertiaryButtonBackdrop} &`]: {
        boxShadow: `inset 0px 0px 0px ${borderSize} ${theme.color['border/onSurfaceCurrent/disabled']}`,
      },
    },
  },

  button: {
    color: theme.color[`text/onSurface${variantColor}/default`],
    '&:hover': {
      backgroundColor: theme.color[`bg/surface${variantColor}/hover`],
    },
    '&:active': {
      backgroundColor: theme.color[`bg/surface${variantColor}/active`],
    },
  },

  tertiaryButton: {
    boxShadow: `inset 0px 0px 0px ${borderSize} ${theme.color[`border/onSurface${variantColor}/action/tertiary`]}`,
    '&:hover': {
      boxShadow: `inset 0px 0px 0px ${borderSize} ${theme.color[`border/onSurface${variantColor}/action/tertiary`]}`,
    },
    '&:active': {
      boxShadow: `inset 0px 0px 0px ${borderSize} ${theme.color[`border/onSurface${variantColor}/action/tertiary`]}`,
    },
    '&:focus': {
      boxShadow: `0px 0px 0px ${outlineSize} ${
        theme.color['border/onSurfaceCurrent/focus']
      }, inset 0px 0px 0px ${borderSize} ${theme.color[`border/onSurface${variantColor}/action/tertiary`]}`,
    },
    '&:not(:disabled) svg': {
      color: theme.color['icon/onSurfaceCurrent/action/default'],
    },
  },

  tertiaryButtonBackdrop: {
    boxShadow: `inset 0px 0px 0px ${borderSize} ${theme.color[`border/onSurface${variantColor}/action/tertiary`]}`,
  },

  variantLink: {
    minWidth: 'initial',
    textAlign: 'left',
    padding: theme.layoutSpacing['spacing/000'],
    textDecoration: 'underline',
    '&:not(:disabled) svg': {
      color: theme.color['icon/onSurfaceCurrent/action/default'],
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      textDecoration: 'underline',
    },
    '&:disabled': {
      backgroundColor: 'transparent',
    },

    [`&.${classes.linkTypeDefault}`]: {
      color: theme.color['text/onSurfaceCurrent/default'],
      '&:active': {
        color: theme.color['text/onSurfaceCurrent/active'],
      },
      '&:disabled': {
        color: theme.color['text/onSurfaceCurrent/disabled'],
      },
    },
    [`&.${classes.linkTypePrimary}`]: {
      color: theme.color['text/onSurfaceCurrent/primary/default'],
      '&:active': {
        color: theme.color['text/onSurfaceCurrent/primary/active'],
      },
      '&:disabled': {
        color: theme.color['text/onSurfaceCurrent/disabled'],
      },
    },
  },

  sizeSm: {
    padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/300']}`,
  },

  sizeMd: {
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
  },

  sizeLg: {
    padding: `${theme.layoutSpacing['spacing/350']} ${theme.layoutSpacing['spacing/400']}`,
  },

  startIcon: {
    marginLeft: theme.layoutSpacing['spacing/000'],
    [`.${classes.variantLink} &`]: {
      marginRight: theme.layoutSpacing['spacing/200'],
    },
  },

  endIcon: {
    marginRight: theme.layoutSpacing['spacing/000'],
    [`.${classes.variantLink} &`]: {
      marginLeft: theme.layoutSpacing['spacing/200'],
    },
  },

  fullWidth: {
    width: '100%',
  },

  linkTypeDefault: {},
  linkTypePrimary: {},
}));

export default useStyles;
