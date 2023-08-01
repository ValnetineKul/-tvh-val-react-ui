import type { ReactNode } from 'react';

import type { AlertProps as MuiAlertProps } from '@mui/material';

import type { DataAttributes } from '../../types/common';

export const Status = {
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success',
} as const;

export type StatusType = typeof Status[keyof typeof Status];

type RestrictedMuiAlertProps = Pick<MuiAlertProps, 'icon'>;

export interface AlertProps extends RestrictedMuiAlertProps {
  status: StatusType;
  onClose?: () => void;
  message: ReactNode;
  action?: ReactNode;
  className?: string;
  classesOverrides?: MuiAlertProps['classes'];
  containerClassName?: string;
  surfaceClassName?: string;
  closable?: boolean;
  closeButtonProps?: DataAttributes;
}
