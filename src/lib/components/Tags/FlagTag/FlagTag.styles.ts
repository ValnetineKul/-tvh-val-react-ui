import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'patchLabel' | 'extraPatchLabel' | 'labelText' | 'tagBox' | 'icon' | 'textIcon'>({
  name: 'FlagTag',
})((theme, _params, classes) => ({
  root: {
    [`& .${classes.patchLabel}`]: {
      backgroundColor: theme.color['bg/surface200/default'],
      color: theme.color['text/onFeedback'],
      '&:after': {
        backgroundColor: theme.color['bg/surface200/default'],
      },
    },
    [`& .${classes.extraPatchLabel}`]: {
      backgroundColor: theme.color['bg/surface300/default'],
      color: theme.color['text/onFeedback'],
      '&:before, &:after': {
        backgroundColor: `${theme.color['bg/surface300/default']} !important`,
      },
    },
  },
  labelText: {},
  tagBox: {
    display: 'inline-flex',
    paddingRight: theme.layoutSpacing['spacing/300'],
    overflow: 'hidden',
    [`& .${classes.labelText}`]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/300']}`,
    },
  },
  patchLabel: {
    position: 'relative',
    ...theme.font['screen/tag/commercial2'],
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: -2,
      width: 10,
      height: '100%',
      transform: 'skew(-10deg)',
    },
  },
  extraPatchLabel: {
    marginLeft: theme.layoutSpacing['spacing/200'],
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      width: 10,
      height: '100%',
      marginLeft: -2, // because of the skewed borders
      transform: 'skew(-10deg)',
    },
  },
  icon: {
    position: 'relative', // fix for storybook iframe
    zIndex: 10,
  },
  noLabel: {
    [`& .${classes.tagBox}`]: {
      paddingRight: theme.layoutSpacing['spacing/300'],
    },
    [`& .${classes.extraPatchLabel}`]: {
      marginLeft: theme.layoutSpacing['spacing/000'],
      '&:before': {
        backgroundColor: 'transparent !important',
        width: 0,
        height: 0,
      },
    },
  },
  sizeXs: {
    [`& .${classes.icon}`]: {
      margin: `${theme.layoutSpacing['spacing/200']}`,
    },
  },
  sizeSm: {
    [`& .${classes.patchLabel}`]: {
      ...theme.font['screen/tag/commercial1'],
      '&:after': {
        right: -3,
      },
    },
    [`& .${classes.patchLabel} + .${classes.patchLabel}`]: {
      marginLeft: 6,
    },
    [`& .${classes.extraPatchLabel}`]: {
      '&:before': {
        marginLeft: -3,
      },
    },
    [`& .${classes.icon}`]: {
      margin: `${theme.layoutSpacing['spacing/200']}`,
    },
  },
  sizeMd: {
    [`& .${classes.patchLabel}`]: {
      ...theme.font['screen/tag/commercial1'],
      '&:after': {
        right: -4,
      },
    },
    [`& .${classes.patchLabel} + .${classes.patchLabel}`]: {
      marginLeft: 7,
    },
    [`& .${classes.extraPatchLabel}`]: {
      '&:before': {
        marginLeft: -4,
      },
    },
    [`& .${classes.icon}`]: {
      margin: theme.layoutSpacing['spacing/300'],
    },
    [`& .${classes.labelText}`]: {
      padding: theme.layoutSpacing['spacing/300'],
    },
  },
  textIconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  textIcon: {
    padding: `0 ${theme.layoutSpacing['spacing/100']}`,
  },
}));

export default useStyles;
