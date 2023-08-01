import { makeStyles } from '../../../../../themes/core';

const useStyles = makeStyles({ name: 'TimelineConnector' })((theme) => ({
  root: {
    position: 'absolute',
    flex: '1 1 auto',
  },
  rootHorizontal: {
    top: `calc(${theme.layoutSpacing['spacing/300']} - 1px)`,
    left: '50%',
    right: '-50%',
  },
  rootReversedHorizontal: {
    top: 'unset',
    bottom: `calc(${theme.layoutSpacing['spacing/300']} - 1px)`,
  },
  rootVertical: {
    left: theme.layoutSpacing['spacing/300'],
    top: theme.layoutSpacing['spacing/500'],
    bottom: `-${theme.layoutSpacing['spacing/500']}`,
  },
  rootVerticalFirst: {
    top: theme.layoutSpacing['spacing/200'],
  },
  rootAlteringVertical: {
    left: '50%',
  },
  line: {
    display: 'block',
  },
  lineHorizontal: {
    borderTopWidth: theme.layoutSpacing['spacing/100'],
    borderTopStyle: 'dashed',
    borderTopColor: theme.color['border/onSurfaceCurrent/disabled'],
    borderLeft: 'none',
  },
  lineVertical: {
    height: '100%',
    borderLeftWidth: theme.layoutSpacing['spacing/100'],
    borderLeftStyle: 'dashed',
    borderLeftColor: theme.color['border/onSurfaceCurrent/disabled'],
    borderTop: 'none',
  },
  lineCompletedHorizontal: {
    borderTopStyle: 'solid',
  },
  lineCompletedVertical: {
    borderLeftStyle: 'solid',
  },
}));

export default useStyles;
