import React, { forwardRef } from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';
import type { ToastStatus } from './Toast';
import Toast from './Toast';
import type { DataAttributes } from '../../types/common';

export type ToastListProps = {
  id: string | number;
  message: {
    status: ToastStatus;
    className?: string;
    button?: {
      label: string;
      action: () => void;
      buttonProps?: DataAttributes;
    };
    closeButtonProps?: DataAttributes;
    closeAction?: () => void;
    message: string;
  };
};

const ToastList = forwardRef<HTMLDivElement, ToastListProps>(
  ({ id, message: { status, className, button, message, closeAction, closeButtonProps } }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleClose = () => {
      closeSnackbar(id);
      if (closeAction) {
        closeAction();
      }
    };

    return (
      <SnackbarContent ref={ref}>
        <Toast
          closeButtonProps={closeButtonProps}
          message={message}
          status={status}
          className={className}
          button={button}
          closeAction={handleClose}
        />
      </SnackbarContent>
    );
  }
);
ToastList.displayName = 'ToastList';

export default ToastList;
