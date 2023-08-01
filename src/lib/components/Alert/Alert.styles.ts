import { makeStyles } from '../../../themes/core';

import type { AlertProps } from './Alert.types';

type RestrictedMuiAlertProps = Pick<AlertProps, 'status'>;
type Props = RestrictedMuiAlertProps & {
  shouldAddAutoLeftMarginToFirstDescendent: boolean;
};

const useStyles = makeStyles<Props, 'icon'>({ name: 'Alert' })((theme, props, classes) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: 'inherit',
    padding: `${theme.layoutSpacing['spacing/300']} ${theme.layoutSpacing['spacing/400']}`,
    borderRadius: theme.borderRadius['borderRadius/none'],
    [`& .${classes.icon}`]: {
      color: `${theme.color[`icon/${props.status}` as const]}`,
    },

    [theme.breakpoints.up('sm')]: {
      padding: theme.layoutSpacing['spacing/300'],
      justifyContent: 'center',
      '& > *:first-of-type': {
        marginLeft: props.shouldAddAutoLeftMarginToFirstDescendent ? 'auto' : undefined,
      },
    },
  },
  icon: {
    padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/000']}`,
    marginRight: theme.layoutSpacing['spacing/300'],
  },
  message: {
    color: theme.color['text/onSurface100/default'],
    padding: `${theme.layoutSpacing['spacing/200']} ${theme.layoutSpacing['spacing/000']}`,
    textAlign: 'left',
  },
  action: {
    padding: `${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/000']} ${theme.layoutSpacing['spacing/300']}`,
    marginRight: theme.layoutSpacing['spacing/000'],
  },
}));

export default useStyles;
