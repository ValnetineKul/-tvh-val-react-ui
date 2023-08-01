import * as React from 'react';
import { default as MuiAlert } from '@mui/material/Alert';
import { capitalize } from '@mui/material/utils';

import { CheckCircle, ExclamationCircle, ExclamationTriangle, InfoCircle, Times } from '../Icon/icons/functional';
import Icon from '../Icon';
import IconButton from '../Buttons/IconButton';

import Typography from '../Typography';

import useStyles from './Alert.styles';
import type { AlertProps } from './Alert.types';
import Surface from '../Surfaces/Surface';
import Collapse from '../Collapse';

const iconMapping = {
  success: <Icon icon={CheckCircle} />,
  warning: <Icon icon={ExclamationTriangle} />,
  error: <Icon icon={ExclamationCircle} />,
  info: <Icon icon={InfoCircle} />,
} as const;

const isNull = (value: unknown): value is null => value === null;
const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';
const isDefined = (value: unknown): boolean => !isNull(value) && !isUndefined(value);

const Alert: React.FC<AlertProps> = ({
  className,
  classesOverrides,
  icon,
  status,
  message,
  action,
  closable,
  onClose,
  closeButtonProps,
  containerClassName,
  surfaceClassName,
}) => {
  const [isClosed, setIsClosed] = React.useState(false);

  const hasAction = closable || isDefined(action);
  const { cx, classes } = useStyles({
    status,
    shouldAddAutoLeftMarginToFirstDescendent: hasAction,
  });

  const handleClose = () => {
    setIsClosed(true);
    onClose?.();
  };

  const renderAction = () => {
    return (
      <>
        {action}
        {closable && (
          <IconButton
            {...closeButtonProps}
            aria-label="close"
            size="md"
            onClick={handleClose}
            icon={<Icon icon={Times} />}
          />
        )}
      </>
    );
  };

  const renderMessage = () => {
    if (typeof message === 'string') {
      return (
        <Typography component="div" variant="body500">
          {message}
        </Typography>
      );
    }

    return message;
  };

  return (
    <Collapse open={!isClosed} className={containerClassName}>
      <Surface color={capitalize(status)} className={surfaceClassName}>
        <MuiAlert
          className={cx(classes.root, className)}
          classes={{
            icon: cx(classes.icon, classesOverrides?.icon),
            message: cx(classes.message, classesOverrides?.message),
            action: cx(classes.action, classesOverrides?.action),
          }}
          severity={status}
          iconMapping={iconMapping}
          icon={icon}
          action={hasAction ? renderAction() : undefined}
        >
          {renderMessage()}
        </MuiAlert>
      </Surface>
    </Collapse>
  );
};

export default Alert;
