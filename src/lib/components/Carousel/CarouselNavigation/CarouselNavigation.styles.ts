import type { Surface } from '../../../../themes/core';
import { makeStyles } from '../../../../themes/core';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';

type Props = {
  surfaceColor: Surface;
};

const useStyles = makeStyles<Props>({ name: 'CarouselNavigation' })((theme, { surfaceColor }) => ({
  sliderArrow: {
    border: 'none',
    margin: theme.layoutSpacing['spacing/000'],
    padding: theme.layoutSpacing['spacing/000'],
    width: 'auto',
    overflow: 'visible',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: 'inherit',
    lineHeight: 'normal',
    outline: 'none',
    color: theme.color['accents/onSurfaceCurrent/primary/default'],
    '&:disabled': {
      cursor: 'default',
      '& svg': {
        color: theme.color['bg/disabled'],
        opacity: (surfaceColor === 'Primary' || surfaceColor === 'Secondary') && 0.56,
      },
    },
    '&:not(:disabled):hover svg': {
      color: theme.color['accents/onSurfaceCurrent/primary/hover'],
    },
    '&:not(:disabled):focus svg': {
      boxShadow: `0px 0px 0px 4px ${theme.color['border/onSurfaceCurrent/focus']}`,
    },
    '&:not(:disabled):active svg': {
      color: theme.color['accents/onSurfaceCurrent/primary/active'],
    },
  },

  navigationPositionTopEnd: {
    marginLeft: 'auto',
  },

  navigationPositionBottomCenter: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },

  arrowContainer: {
    display: 'flex',
    gap: 40,
  },

  arrow: {
    width: '100%',
    height: 16,
  },

  nextArrow: {
    width: 56,
  },

  prevArrow: {
    width: 32,
  },

  hiddenNavigation: {
    display: 'none',
  },
}));

export default useStyles;
