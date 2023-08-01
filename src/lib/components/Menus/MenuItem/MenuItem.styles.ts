import type { Surface } from '../../../../themes/core';
import { makeStyles } from '../../../../themes/core';

type Props = {
  surface: Surface;
};

const useStyles = makeStyles<
  Props,
  'wrapper' | 'selected' | 'disabled' | 'startIcon' | 'endIcon' | 'label' | 'subLabel' | 'tag' | 'inlineMessage'
>({ name: 'MenuItem' })((theme, { surface }, classes) => ({
  root: {
    padding: theme.layoutSpacing['spacing/000'],
    minHeight: 'auto',
    '& label': {
      width: '100%',
      padding: `${theme.layoutSpacing['spacing/350']} ${theme.layoutSpacing['spacing/400']}`,
    },
    [`&.${classes.disabled}`]: {
      opacity: 1,
      [`& .${classes.subLabel}, & .${classes.inlineMessage} svg, & .${classes.startIcon}, & .${classes.endIcon}`]: {
        color: theme.color[`text/onSurface${surface}/disabled` as const],
      },
      [`& .${classes.tag}`]: {
        backgroundColor: theme.color['bg/disabled'],
        color: theme.color['text/onSurface100/disabled'],
      },
    },
    [`&.${classes.selected}`]: {
      backgroundColor: 'transparent',
    },
    [`&.${classes.selected}:hover, &:not(:disabled):hover`]: {
      backgroundColor: theme.color[`bg/surface${surface}/hover` as const],
    },
    [`&.${classes.selected}:active, &:not(:disabled):active`]: {
      backgroundColor: theme.color[`bg/surface${surface}/active` as const],
    },
  },
  wrapper: {
    padding: `${theme.layoutSpacing['spacing/350']} ${theme.layoutSpacing['spacing/400']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minWidth: 120,
    minHeight: theme.layoutSpacing['spacing/550'],
    '&:not(:disabled):hover': {
      backgroundColor: 'transparent',
    },
  },
  labelWrapper: {
    flex: 1,
    overflow: 'hidden',
    textAlign: 'left',
  },
  startIcon: {
    marginRight: theme.layoutSpacing['spacing/300'],
    color: theme.color[`icon/onSurface${surface}/default` as const],
  },
  endIcon: {
    marginLeft: theme.layoutSpacing['spacing/300'],
    color: theme.color[`icon/onSurface${surface}/default` as const],
  },
  label: {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&::first-letter': {
      textTransform: 'capitalize',
    },
  },
  tag: {
    marginLeft: theme.layoutSpacing['spacing/300'],
  },
  checkboxWithTagWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  subLabel: {},
  selected: {},
  disabled: {},
  inlineMessage: {},
  focusVisible: {
    [`& .${classes.wrapper}`]: {
      backgroundColor: theme.color[`bg/surface${surface}/hover` as const],
    },
  },
}));

export default useStyles;
