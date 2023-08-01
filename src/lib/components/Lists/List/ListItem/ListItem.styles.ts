import { makeStyles } from '../../../../../themes/core';

const useStyles = makeStyles({ name: 'ListItem' })((theme) => ({
  root: {
    position: 'relative',
    marginBottom: theme.layoutSpacing['spacing/200'],

    '& > ul': {
      paddingLeft: theme.layoutSpacing['spacing/450'],
      marginTop: theme.layoutSpacing['spacing/200'],
    },
  },

  orderedRoot: {},

  unorderedRoot: {
    '&:before': {
      content: '""',
      display: 'inline-block',
      width: 4,
      height: 4,
      borderRadius: theme.borderRadius['borderRadius/circle'],
      backgroundColor: theme.color['icon/onSurfaceCurrent/action/default'],
      position: 'absolute',
      left: -11,
      top: 10,
    },
  },

  iconRoot: {
    display: 'flex',
    '& > div > ul': {
      paddingLeft: theme.layoutSpacing['spacing/000'],
      marginTop: theme.layoutSpacing['spacing/200'],
    },
  },

  icon: {
    color: theme.color['icon/onSurfaceCurrent/action/default'],
    marginRight: theme.layoutSpacing['spacing/300'],
  },
}));

export default useStyles;
