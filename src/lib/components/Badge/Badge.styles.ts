import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles({ name: 'Badge' })((theme) => ({
  root: {
    position: 'relative',
    display: 'inline-flex',
    verticalAlign: 'middle',
    alignItems: 'center',
  },

  badge: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    boxSizing: 'border-box',
    minWidth: `calc(${theme.layoutSpacing['spacing/400']} - 1px)`,
    padding: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/200']}`,
    height: '20px',
    borderRadius: theme.borderRadius['borderRadius/round/150'],
    zIndex: 1,
  },

  badgeTypography: {
    overflowWrap: 'normal',
  },

  dot: {
    height: theme.layoutSpacing['spacing/300'],
    minWidth: theme.layoutSpacing['spacing/300'],
    padding: 0,
  },

  dotMd: {
    bottom: `calc(${theme.layoutSpacing['spacing/350']} + 2px)`,
    left: `calc(${theme.layoutSpacing['spacing/350']} + 2px)`,
  },

  dotSm: {
    bottom: theme.layoutSpacing['spacing/300'],
    left: theme.layoutSpacing['spacing/300'],
  },

  iconBadgePosition: {
    bottom: theme.layoutSpacing['spacing/350'],
    left: theme.layoutSpacing['spacing/350'],
  },

  textBadgePosition: {
    position: 'static',
    marginLeft: theme.layoutSpacing['spacing/300'],
  },

  textDotPosition: {
    top: 0,
    left: '100%',
  },

  fullWidth: {
    width: '100%',
    justifyContent: 'space-between',
  },
  invertedTypography: {
    color: theme.color['bg/surfacePrimary/default'],
  },
}));

export default useStyles;
