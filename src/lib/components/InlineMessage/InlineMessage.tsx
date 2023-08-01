import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material/utils';
import { CheckCircle, ExclamationCircle, ExclamationTriangle, InfoCircle } from '../Icon/icons/functional';
import Icon from '../Icon';
import Typography from '../Typography';
import useStyles from './InlineMessage.styles';
import Button from '../Buttons/Button';
import type { ButtonBaseProps } from '../ButtonBase';
import { useButtonBase } from '../ButtonBase';
import Spinner from '../ProgressIndicators/Spinner';
import type { DataAttributes } from '../../types/common';

export interface InlineMessageProps extends ButtonBaseProps {
  message: string;
  size?: 'sm' | 'md';
  status?: 'success' | 'error' | 'warning' | 'info' | 'loading';
  style?: React.CSSProperties;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  spinnerClassName?: string;
  buttonProps?: DataAttributes;
}

const InlineMessage: FC<InlineMessageProps> = ({
  size = 'md',
  status,
  style,
  className,
  spinnerClassName,
  message,
  actionLabel,
  onAction,
  buttonProps,
  ...props
}) => {
  const { classes, cx } = useStyles();
  const buttonBaseProps = useButtonBase(props);

  const statusClassName =
    status && status !== 'loading' ? (classes as Record<string, string>)[`status${capitalize(status)}`] : '';
  const sizeClassName = (classes as Record<string, string>)[`size${capitalize(size)}`];
  const typographyVariant = size === 'sm' ? 'body400' : 'body500';

  const icons: Record<
    string,
    React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string;
      }
    >
  > = {
    success: CheckCircle,
    warning: ExclamationTriangle,
    error: ExclamationCircle,
    info: InfoCircle,
  };

  return (
    <div className={cx(classes.root, sizeClassName, statusClassName, className)} style={style}>
      {status && status !== 'loading' && <Icon icon={icons[status]} className={classes.icon} size={size} />}
      {status && status === 'loading' && (
        <div className={classes.spinnerWrapper}>
          <Spinner className={classes.spinner} spinnerClassName={spinnerClassName} size={size} />
        </div>
      )}

      <div>
        <Typography variant={typographyVariant} component="span" className={classes.message}>
          {actionLabel ? `${message} ` : message}
        </Typography>
        {actionLabel && (
          <Button
            label={actionLabel}
            variant="link"
            className={classes.buttonLink}
            onClick={(e) => {
              e.stopPropagation();
              onAction && onAction();
            }}
            {...buttonBaseProps}
            {...(buttonProps || {})}
          />
        )}
      </div>
    </div>
  );
};

export default InlineMessage;
