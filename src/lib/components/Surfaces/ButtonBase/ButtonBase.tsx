import type { MouseEventHandler } from 'react';
import React, { forwardRef } from 'react';
import { default as MUIButtonBase } from '@mui/material/ButtonBase';
import { SurfaceProvider } from '../../../../themes/core';
import type { Surface as SurfaceType } from '../../../../themes/core';
import type { ButtonBaseProps } from '../../ButtonBase';
import { useButtonBase } from '../../ButtonBase';
import type { DataAttributes } from '../../../types/common';
import useStyles from './ButtonBase.styles';

export interface SurfaceButtonBaseProps extends ButtonBaseProps {
  color: SurfaceType;
  children?: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  disabled?: boolean;
  focus?: 'inset' | 'out';
  border?: boolean;
  tabIndex?: number;
  type?: 'submit' | 'button';
  buttonProps?: React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & DataAttributes;
}

const ButtonBase = forwardRef<HTMLElement, SurfaceButtonBaseProps>(
  ({ color, children, className, disabled, focus = 'out', border, tabIndex, type, buttonProps, ...props }, ref) => {
    const { classes, cx } = useStyles({ surface: color });
    const rootClassName = cx(
      classes.root,
      {
        [classes.border]: border,
        [classes.focusInset]: focus === 'inset',
        [classes.focusOut]: focus === 'out',
      },
      className
    );
    const buttonBaseProps = useButtonBase(props);

    return (
      <SurfaceProvider color={color}>
        <MUIButtonBase
          {...props}
          {...buttonBaseProps}
          {...buttonProps}
          disabled={disabled}
          className={rootClassName}
          ref={ref}
          tabIndex={tabIndex}
          type={type}
        >
          {children}
        </MUIButtonBase>
      </SurfaceProvider>
    );
  }
);
ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
