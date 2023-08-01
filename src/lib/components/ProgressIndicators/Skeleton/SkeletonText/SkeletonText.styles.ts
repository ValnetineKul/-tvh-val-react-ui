import type { Surface } from '../../../../../themes/core';
import { makeStyles } from '../../../../../themes/core';
import { skeletonAnimationStyles } from '../helper';

type Props = {
  onSurface: Surface;
  width?: number | string;
};

const useStyles = makeStyles<Props, 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2'>({
  name: 'SkeletonText',
})((theme, { onSurface, width }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width,
  },
  skeletonAnimation: {
    ...skeletonAnimationStyles(
      onSurface === '200' ? theme.color['bg/surface300/default'] : theme.color['bg/surface200/default'],
      onSurface === '200' ? theme.color['bg/surface400/default'] : theme.color['bg/surface150/default']
    ),
  },
  h1: {
    height: theme.font['screen/heading1/functional/xs'].fontSize,
    marginBottom: '6px',
    [theme.breakpoints.up('sm')]: {
      height: theme.font['screen/heading1/functional/sm'].fontSize,
      marginBottom: '5px',
    },
  },
  h2: {
    height: theme.font['screen/heading2/functional/xs'].fontSize,
    marginBottom: '6px',
    [theme.breakpoints.up('sm')]: {
      height: theme.font['screen/heading2/functional/sm'].fontSize,
      marginBottom: theme.layoutSpacing['spacing/200'],
    },
  },
  h3: {
    height: theme.font['screen/heading3/functional/xs'].fontSize,
    marginBottom: '3px',
    [theme.breakpoints.up('sm')]: {
      height: theme.font['screen/heading3/functional/sm'].fontSize,
      marginBottom: '6px',
    },
  },
  h4: {
    height: theme.font['screen/heading4/functional/xs'].fontSize,
    marginBottom: '6px',
    [theme.breakpoints.up('sm')]: {
      height: theme.font['screen/heading4/functional/sm'].fontSize,
      marginBottom: theme.layoutSpacing['spacing/200'],
    },
  },
  heading: {
    width: '198px',
  },
  bodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.layoutSpacing['spacing/300'],
  },
  body1: {
    height: theme.layoutSpacing['spacing/400'],
    marginTop: theme.layoutSpacing['spacing/200'],
    marginBottom: theme.layoutSpacing['spacing/200'],
    ':last-child': {
      width: '60%',
    },
  },
  body2: {
    height: theme.layoutSpacing['spacing/350'],
    marginTop: theme.layoutSpacing['spacing/100'],
    marginBottom: theme.layoutSpacing['spacing/100'],
    ':last-child': {
      width: '60%',
    },
  },
}));

export default useStyles;
