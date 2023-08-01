import { makeStyles } from '../../../../themes/core';

const useStyles = makeStyles<void, 'label' | 'content' | 'firstOfTypeChecked' | 'lastOfTypeChecked' | 'icon'>({
  name: 'SegmentItem',
})((theme, _, classes) => ({
  segmentItem: {
    flex: '1 1 0px',
  },

  widthForTrancation: {
    minWidth: theme.layoutSpacing['spacing/000'],
    width: theme.layoutSpacing['spacing/500'],
  },

  wrapper: {
    display: 'flex',
    height: '100%',
  },

  input: {
    position: 'absolute',
    opacity: 0,
    height: theme.layoutSpacing['spacing/000'],
    width: theme.layoutSpacing['spacing/000'],
    [`&:not(:disabled):hover + .${classes.label} .${classes.content}`]: {
      backgroundColor: theme.color['bg/surface100/hover'],
    },
    [`&:not(:disabled):active + .${classes.label} .${classes.content}`]: {
      backgroundColor: theme.color['bg/surface100/active'],
    },
    [`&:checked + .${classes.label} .${classes.content}`]: {
      borderTopColor: theme.color['border/onSurfaceCurrent/selected'],
      borderBottomColor: theme.color['border/onSurfaceCurrent/selected'],
    },
    [`&:not(:disabled):focus + .${classes.label} .${classes.content}`]: {
      outline: 'none',
      boxShadow: `0px 0px 0px 4px ${theme.color['border/onSurface100/focus']}`,
    },
    [`&:disabled + .${classes.label} .${classes.content}`]: {
      color: theme.color['text/onSurfaceCurrent/disabled'],
    },
    [`&:disabled + .${classes.label}`]: {
      cursor: 'default',
    },
    [`&:disabled + .${classes.label} .${classes.icon}`]: {
      '& svg': {
        color: theme.color['text/onSurfaceCurrent/disabled'],
      },
    },
  },

  label: {
    cursor: 'pointer',
    width: '100%',

    textAlign: 'center',
  },

  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: `calc(${theme.layoutSpacing['spacing/300']} - 1px)`,
    borderTop: `1px solid ${theme.color['border/onSurfaceCurrent/default']}`,
    borderBottom: `1px solid ${theme.color['border/onSurfaceCurrent/default']}`,
  },

  firstOfType: {
    borderLeft: `1px solid ${theme.color['border/onSurfaceCurrent/default']}`,
    borderRadius: `${theme.borderRadius['borderRadius/round/100']} ${theme.borderRadius['borderRadius/none']} ${theme.borderRadius['borderRadius/none']} ${theme.borderRadius['borderRadius/round/100']}`,
    [`&.${classes.firstOfTypeChecked}`]: {
      borderLeftColor: theme.color['border/onSurfaceCurrent/selected'],
    },
  },

  lastOfType: {
    borderRight: `1px solid ${theme.color['border/onSurfaceCurrent/default']}`,
    borderRadius: `${theme.borderRadius['borderRadius/none']} ${theme.borderRadius['borderRadius/round/100']} ${theme.borderRadius['borderRadius/round/100']} ${theme.borderRadius['borderRadius/none']}`,
    [`&.${classes.lastOfTypeChecked}`]: {
      borderRightColor: theme.color['border/onSurfaceCurrent/selected'],
    },
  },

  firstOfTypeChecked: {},
  lastOfTypeChecked: {},

  iconSegment: {
    width: theme.layoutSpacing['spacing/500'],
  },

  divider: {
    // to fix behavior when divider hides under hover background
    position: 'relative',
  },

  selectedDivider: {
    borderColor: theme.color['border/onSurfaceCurrent/selected'],
  },

  truncate: {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  icon: {
    '& svg': {
      color: theme.color['icon/onSurface100/default'],
    },
  },
}));

export default useStyles;
