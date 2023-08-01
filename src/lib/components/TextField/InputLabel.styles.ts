import { makeStyles } from '../../../themes/core';

import { surface } from './TextField.constants';

const useStyles = makeStyles<void, 'isRequired' | 'isDisabled'>({ name: 'InputLabel' })((theme, _params, classes) => ({
  root: {
    display: 'flex',
  },
  label: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    [`.${classes.isRequired} &`]: {
      maxWidth: 'calc(100% - 12px)',
    },
  },
  required: {
    display: 'inline-block',
    color: theme.color[`text/onSurface${surface}/error` as const],
    marginLeft: theme.layoutSpacing['spacing/200'],

    [`.${classes.isDisabled} &`]: {
      color: theme.color[`text/onSurface${surface}/disabled` as const],
    },
  },
  isRequired: {},
  isDisabled: {},
}));

export default useStyles;
