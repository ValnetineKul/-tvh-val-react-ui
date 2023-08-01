import type { FC } from 'react';
import React from 'react';
import type { Surface as SurfaceType } from '../../../../themes/core';
import Button from '../../Buttons/Button';
import IconButton from '../../Buttons/IconButton';
import { Times } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import InlineMessage from '../../InlineMessage';
import useStyles from './Toast.styles';
import Surface from '../../Surfaces/Surface';
import type { DataAttributes } from '../../../types/common';

export type ToastStatus = 'success' | 'warning' | 'error' | 'info' | 'loading';

const colorMap = {
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  info: 'Info',
  loading: 'Info',
};

export interface ToastProps {
  message: string;
  status: ToastStatus;
  className?: string;
  button?: {
    label: string;
    action: () => void;
    buttonProps?: DataAttributes;
  };
  closeAction?: () => void;
  closeButtonProps?: DataAttributes;
}

const Toast: FC<ToastProps> = ({ message, status, className, button, closeAction, closeButtonProps }) => {
  const { classes, cx } = useStyles();

  const handleAction: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    button?.action();
    if (closeAction) {
      closeAction();
    }
  };
  const handleClose: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    if (closeAction) {
      closeAction();
    }
  };

  return (
    <Surface color={colorMap[status] as SurfaceType} className={cx(classes.root, className)}>
      <div>
        <InlineMessage message={message} status={status} spinnerClassName={classes.spinner} />
        {button && (
          <Button
            className={classes.actionButton}
            surfaceClassName={classes.surfaceActionButton}
            size="sm"
            variant="tertiary"
            label={button.label}
            onClick={handleAction}
            {...button?.buttonProps}
          />
        )}
      </div>
      <IconButton {...closeButtonProps} icon={<Icon icon={Times} />} onClick={handleClose} aria-label="close" />
    </Surface>
  );
};

export default Toast;
