import { makeStyles } from '../../../themes/core';

import { surface } from './TextField.constants';

const useStyles = makeStyles<
  void,
  | 'fullWidth'
  | 'withLabel'
  | 'notchedOutline'
  | 'withError'
  | 'alignRight'
  | 'withStartIcon'
  | 'inputRoot'
  | 'readOnly'
  | 'withStartAdornment'
  | 'inputDisabled'
  | 'disabled'
  | 'withEndIcon'
  | 'adornment'
  | 'characterCount'
>({ name: 'TextField' })((theme, _, classes) => ({
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    lineHeight: 0,

    [`&.${classes.fullWidth}`]: {
      width: '100%',
    },

    [`&:not(${classes.withLabel})`]: {
      [`&.${classes.inputRoot} .${classes.withLabel} &`]: {
        alignItems: 'baseline',
      },
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {},
      [`&:not(.${classes.withError}):not(.${classes.readOnly}):hover fieldset, &:hover .${classes.notchedOutline}`]: {
        borderColor: theme.color['border/onSurfaceCurrent/default'],
      },
    },
  },

  inputRoot: {
    width: '100%',
    padding: '0 !important',
    backgroundColor: theme.color[`bg/surface${surface}/default` as const],
    borderRadius: theme.borderRadius['borderRadius/none'],
    color: 'inherit',
    [`&.${classes.withError}`]: {
      backgroundColor: theme.color['bg/error/input'],
    },
  },

  input: {
    height: 24,
    ...theme.font['screen/body500/regular/default'],
    padding: `${theme.layoutSpacing['spacing/350']} ${theme.layoutSpacing['spacing/300']} !important`,
    color: theme.color[`text/onSurface${surface}/default` as const],

    '&::placeholder': {
      color: theme.color[`text/onSurface${surface}/placeholder` as const],
      opacity: 1,
    },
    [`.${classes.withError} &`]: {
      color: theme.color[`text/onSurface${surface}/default` as const],

      '&:-internal-autofill-selected, &:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 50px ${theme.color['bg/error/input']} inset`,
      },
    },
    [`.${classes.withLabel} &`]: {
      paddingTop: '20px !important',
      paddingBottom: `${theme.layoutSpacing['spacing/200']} !important`,
    },
    '&[type=search]::-webkit-search-cancel-button': {
      display: 'none',
    },
    '&[type=number]': {
      MozAppearance: 'textfield',
    },
    '&::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    [`.${classes.alignRight} &`]: {
      textAlign: 'right',
    },
    [`.${classes.withStartAdornment} &`]: {
      paddingLeft: '0 !important',
    },
    [`&.${classes.inputDisabled}`]: {
      WebkitTextFillColor: theme.color[`text/onSurface${surface}/disabled` as const],
    },
  },

  label: {
    color: theme.color[`text/onSurface${surface}/default` as const],
    transform: 'none',
    top: 1,
    padding: `calc(${theme.layoutSpacing['spacing/200']} - 1px) 0 0 0`,
    left: theme.layoutSpacing['spacing/300'],
    // 8px text field padding left + 8px text field padding right = 16px
    width: `calc(100% - 2 * ${theme.layoutSpacing['spacing/300']})`,

    '&[data-shrink=false] + .MuiInputBase-formControl .MuiInputBase-input': {
      '&::-webkit-input-placeholder': {
        opacity: '1 !important',
      },
      '&::-moz-placeholder': {
        opacity: '1 !important',
      },
    },
    [`.${classes.withStartIcon} &`]: {
      left: 40,
      // 8px text field padding left + 24 px svg width + 8px svg margin right + 8px text field padding right = 48px
      width: `calc(100% - (3 * ${theme.layoutSpacing['spacing/300']} + ${theme.layoutSpacing['spacing/450']}))`,
    },
    [`.${classes.withEndIcon} &`]: {
      // 8px text field padding left + 32 px svg width + 8px svg margin left + 8px text field padding right = 56px
      width: `calc(100% - (3 * ${theme.layoutSpacing['spacing/300']} + ${theme.layoutSpacing['spacing/500']}))`,
    },
    [`.${classes.withError} &`]: {
      color: theme.color[`text/onSurface${surface}/error` as const],
      backgroundColor: theme.color['bg/error/input'],
      top: 2,
      padding: `calc(${theme.layoutSpacing['spacing/200']} - 2px) 0 0 0`,
    },
    [`.${classes.disabled} &`]: {
      color: `${theme.color[`text/onSurface${surface}/disabled` as const]}`,
      background: 'none',
    },
  },

  labelFocused: {
    color: `${theme.color[`text/onSurface${surface}/default` as const]} !important`,

    [`.${classes.withError} &`]: {
      color: `${theme.color[`text/onSurface${surface}/error` as const]} !important`,
    },
  },

  adornment: {
    height: 'auto',
    maxHeight: 'none',
    alignItems: 'stretch',
    margin: theme.layoutSpacing['spacing/000'],
    color: theme.color[`text/onSurface${surface}/secondary`],
    zIndex: 2,
  },
  adornedStart: {
    paddingLeft: `${theme.layoutSpacing['spacing/300']} !important`,
  },
  adornedEnd: {
    paddingRight: `${theme.layoutSpacing['spacing/300']} !important`,
  },
  adornmentText: {
    [`.${classes.withLabel} &`]: {
      marginBottom: -15,
    },
  },
  prefix: {
    marginRight: theme.layoutSpacing['spacing/300'],
  },

  startIcon: {
    marginRight: theme.layoutSpacing['spacing/300'],

    '& svg': {
      color: theme.color[`icon/onSurface${surface}/default` as const],

      [`.${classes.disabled} &`]: {
        color: theme.color[`text/onSurface${surface}/disabled` as const],
      },
    },
  },

  endAdornment: {
    '& svg': {
      [`.${classes.disabled} &`]: {
        color: theme.color[`text/onSurface${surface}/disabled` as const],
      },
    },
  },
  helpers: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  inlineMessage: {
    width: '100%',
    marginLeft: theme.layoutSpacing['spacing/000'],
    marginRight: theme.layoutSpacing['spacing/000'],
    color: `${theme.color['text/onSurfaceCurrent/default']} !important`,
  },
  alertIcon: {
    display: 'inline-block',
    color: theme.color['icon/error'],
  },
  characterCount: {
    color: `${theme.color['text/onSurfaceCurrent/secondary']}`,
    marginLeft: theme.layoutSpacing['spacing/300'],
    marginRight: theme.layoutSpacing['spacing/000'],

    [`.${classes.withError} &`]: {
      color: theme.color['text/onSurfaceCurrent/error'],
    },
  },

  normalOverflowWrap: {
    overflowWrap: 'normal',
  },

  readOnlyBlock: {
    height: 48,
    display: 'inline-flex',
    alignItems: 'baseline',
    position: 'relative',
    padding: `20px ${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/200']}`,

    [`.${classes.withStartIcon} &`]: {
      paddingLeft: 24,
    },
  },

  readOnlyValue: {
    [`.${classes.withStartIcon} &`]: {
      marginLeft: theme.layoutSpacing['spacing/400'],
    },
  },

  readOnlyStartAdornment: {
    position: 'absolute',
    left: theme.layoutSpacing['spacing/300'],
    height: 'fit-content',
    top: 0,
    bottom: 0,
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  notchedOutline: {
    borderColor: theme.color['border/onSurfaceCurrent/default'],
    [`.${classes.disabled} &`]: {
      borderColor: `${theme.color['border/onSurfaceCurrent/disabled']} !important`,
    },
    [`.${classes.withError} &`]: {
      border: `2px solid ${theme.color['border/onSurfaceCurrent/error']} !important`,
    },
  },

  focused: {
    boxShadow: `0px 0px 0px 4px ${theme.color['border/onSurfaceCurrent/focus']}`,
    [`&.${classes.disabled}`]: {
      boxShadow: 'none',
    },
    [`.${classes.readOnly} &`]: {
      boxShadow: 'none !important',
    },
    [`&:not(.${classes.withError}) .${classes.notchedOutline}`]: {
      border: `1px solid ${theme.color['border/onSurfaceCurrent/default']}`,
    },
  },

  disabled: {
    cursor: 'default',
    pointerEvents: 'none',
    [`& .${classes.inputRoot}`]: {
      color: theme.color[`text/onSurface${surface}/disabled` as const],
    },
    [`& .${classes.adornment}`]: {
      color: `${theme.color[`text/onSurface${surface}/disabled` as const]} !important`,
    },
    [`& .${classes.characterCount}`]: {
      color: theme.color['text/onSurfaceCurrent/disabled'],
    },
  },

  inputDisabled: {
    backgroundColor: theme.color['bg/disabled'],
    color: theme.color[`text/onSurface${surface}/disabled` as const],
  },

  readOnly: {
    backgroundColor: theme.color[`bg/surface${surface}/default` as const],
    color: theme.color[`text/onSurface${surface}/default` as const],
    cursor: 'default',
    pointerEvents: 'none',

    [`& .${classes.notchedOutline}`]: {
      borderColor: 'transparent',
    },
  },

  withError: {},

  fullWidth: {},
  alignRight: {},
  withStartIcon: {},
  withEndIcon: {},
  withStartAdornment: {},
  withLabel: {},
}));

export default useStyles;
