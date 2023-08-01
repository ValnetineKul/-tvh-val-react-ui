import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'headerFunctional' | 'headerCommercial' | 'weightRegular' | 'weightEmphasis'>({
  name: 'Typography',
})((theme, _, classes) => ({
  root: {
    margin: 0,
    wordBreak: 'normal',
    overflowWrap: 'anywhere',
  },
  h1: {
    [`&.${classes.headerFunctional}`]: {
      '@media print': {
        ...theme.font['print/heading1/functional'],
      },
      '@media screen': {
        ...theme.font['screen/heading1/functional/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading1/functional/sm'],
        },
      },
    },

    [`&.${classes.headerCommercial}`]: {
      '@media print': {
        ...theme.font['print/heading1/commercial'],
      },
      '@media screen': {
        ...theme.font['screen/heading1/commercial/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading1/commercial/sm'],
        },
      },
    },
  },
  h2: {
    [`&.${classes.headerFunctional}`]: {
      '@media print': {
        ...theme.font['print/heading2/functional'],
      },
      '@media screen': {
        ...theme.font['screen/heading2/functional/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading2/functional/sm'],
        },
      },
    },

    [`&.${classes.headerCommercial}`]: {
      '@media print': {
        ...theme.font['print/heading2/commercial'],
      },
      '@media screen': {
        ...theme.font['screen/heading2/commercial/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading2/commercial/sm'],
        },
      },
    },
  },
  h3: {
    [`&.${classes.headerFunctional}`]: {
      '@media print': {
        ...theme.font['print/heading3/functional'],
      },
      '@media screen': {
        ...theme.font['screen/heading3/functional/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading3/functional/sm'],
        },
      },
    },

    [`&.${classes.headerCommercial}`]: {
      '@media print': {
        ...theme.font['print/heading3/commercial'],
      },
      '@media screen': {
        ...theme.font['screen/heading3/commercial/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading3/commercial/sm'],
        },
      },
    },
  },
  h4: {
    [`&.${classes.headerFunctional}`]: {
      '@media print': {
        ...theme.font['print/heading4/functional'],
      },
      '@media screen': {
        ...theme.font['screen/heading4/functional/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading4/functional/sm'],
        },
      },
    },

    [`&.${classes.headerCommercial}`]: {
      '@media print': {
        ...theme.font['print/heading4/commercial'],
      },
      '@media screen': {
        ...theme.font['screen/heading4/commercial/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading4/commercial/sm'],
        },
      },
    },
  },
  h5: {
    [`&.${classes.headerFunctional}`]: {
      '@media print': {
        ...theme.font['print/heading5/functional'],
      },
      '@media screen': {
        ...theme.font['screen/heading5/functional/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading5/functional/sm'],
        },
      },
    },

    [`&.${classes.headerCommercial}`]: {
      '@media print': {
        ...theme.font['print/heading5/commercial'],
      },
      '@media screen': {
        ...theme.font['screen/heading5/commercial/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading5/commercial/sm'],
        },
      },
    },
  },
  h6: {
    [`&.${classes.headerFunctional}`]: {
      '@media print': {
        ...theme.font['print/heading6/functional'],
      },
      '@media screen': {
        ...theme.font['screen/heading6/functional/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading6/functional/sm'],
        },
      },
    },

    [`&.${classes.headerCommercial}`]: {
      '@media print': {
        ...theme.font['print/heading6/commercial'],
      },
      '@media screen': {
        ...theme.font['screen/heading6/commercial/xs'],
        [theme.breakpoints.up('sm')]: {
          ...theme.font['screen/heading6/commercial/sm'],
        },
      },
    },
  },
  headerFunctional: {},
  headerCommercial: {},
  body600: {
    [`&.${classes.weightRegular}`]: {
      ...theme.font['screen/body600/regular/default'],
    },
    [`&.${classes.weightEmphasis}`]: {
      ...theme.font['screen/body600/emphasis/default'],
    },
  },
  body500: {
    '@media screen': {
      [`&.${classes.weightRegular}`]: {
        ...theme.font['screen/body500/regular/default'],
      },
      [`&.${classes.weightEmphasis}`]: {
        ...theme.font['screen/body500/emphasis/default'],
      },
    },
    '@media print': {
      [`&.${classes.weightRegular}`]: {
        ...theme.font['print/body500/regular/default'],
      },
      [`&.${classes.weightEmphasis}`]: {
        ...theme.font['print/body500/emphasis/default'],
      },
    },
  },
  body400: {
    '@media screen': {
      [`&.${classes.weightRegular}`]: {
        ...theme.font['screen/body400/regular/default'],
      },
      [`&.${classes.weightEmphasis}`]: {
        ...theme.font['screen/body400/emphasis/default'],
      },
    },
    '@media print': {
      [`&.${classes.weightRegular}`]: {
        ...theme.font['print/body400/regular/default'],
      },
      [`&.${classes.weightEmphasis}`]: {
        ...theme.font['print/body400/emphasis/default'],
      },
    },
  },
  body300: {
    '@media screen': {
      [`&.${classes.weightRegular}`]: {
        ...theme.font['screen/body300/regular/default'],
      },
      [`&.${classes.weightEmphasis}`]: {
        ...theme.font['screen/body300/emphasis/default'],
      },
    },
    '@media print': {
      [`&.${classes.weightRegular}`]: {
        ...theme.font['print/body300/regular/default'],
      },
      [`&.${classes.weightEmphasis}`]: {
        ...theme.font['print/body300/emphasis/default'],
      },
    },
  },
  secondary: {
    color: theme.color['text/onSurfaceCurrent/secondary'],
  },
  weightRegular: {},
  weightEmphasis: {},
  inherit: {},
}));

export default useStyles;
