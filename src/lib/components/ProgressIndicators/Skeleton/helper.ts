import type { CSSObject } from '@emotion/react';

export const skeletonAnimationStyles = (
  backgroundColor: CSSObject['backgroundColor'],
  gradientColor: CSSObject['backgroundColor']
): CSSObject => ({
  backgroundColor,
  '@keyframes loading': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '50%': {
      transform: 'translateX(100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
  '&:after': {
    animation: 'loading 2s linear infinite',
    background: `linear-gradient(90deg, transparent, ${gradientColor}, transparent)`,
    position: 'absolute',
    transform: 'translateX(-100%)',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
