import { makeStyles } from '../../../themes/core';

const useStyles = makeStyles<void, 'sizeSm' | 'sizeMd' | 'icon'>({ name: 'InlineMessage' })(
  (theme, _params, classes) => ({
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      fontSize: 0,
    },
    icon: {
      [`.${classes.sizeSm} &`]: {
        marginRight: theme.layoutSpacing['spacing/200'],
      },
      [`.${classes.sizeMd} &`]: {
        marginRight: theme.layoutSpacing['spacing/300'],
      },
    },
    message: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    buttonLink: {
      verticalAlign: 'baseline',
      [`.${classes.sizeSm} &`]: {
        ...theme.font['screen/body400/regular/default'],
      },
      [`.${classes.sizeMd} &`]: {
        ...theme.font['screen/body500/regular/default'],
      },
    },

    sizeSm: {},
    sizeMd: {},

    statusSuccess: {
      [`& .${classes.icon}`]: {
        color: theme.color['icon/success'],
      },
    },
    statusWarning: {
      [`& .${classes.icon}`]: {
        color: theme.color['icon/warning'],
      },
    },
    statusError: {
      [`& .${classes.icon}`]: {
        color: theme.color['icon/error'],
      },
    },
    statusInfo: {
      [`& .${classes.icon}`]: {
        color: theme.color['icon/info'],
      },
    },
    spinner: {
      margin: theme.layoutSpacing['spacing/100'],
    },
    spinnerWrapper: {
      [`.${classes.sizeSm} &`]: {
        marginRight: theme.layoutSpacing['spacing/200'],
      },
      [`.${classes.sizeMd} &`]: {
        marginRight: `calc(${theme.layoutSpacing['spacing/300']} + 1px)`,
      },
    },
  })
);

export default useStyles;
