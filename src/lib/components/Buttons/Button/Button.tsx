import { default as MuiButton } from '@mui/material/Button';
import type { ReactElement, MouseEventHandler, KeyboardEvent } from 'react';
import React, { forwardRef } from 'react';
import { capitalize } from '@mui/material/utils';
import type { ButtonBaseProps } from '../../ButtonBase';
import Surface from '../../Surfaces/Surface';
import type { Surface as SurfaceColor } from '../../../../themes/core';
import { useSurface } from '../../../../themes/core';
import SpinnerWithBackdrop from '../../ProgressIndicators/Spinner/SpinnerWithBackdrop';
import useStyles from './Button.styles';
import useGetButtonProps from './helpers/useGetButtonProps';
import type { DataAttributes } from '../../../types/common';

export interface ButtonCommonProps extends ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  type?: 'button' | 'submit';
  linkType?: 'default' | 'primary';
  label: string | ReactElement;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  surfaceClassName?: string;
  containerClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyPress?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  buttonProps?: DataAttributes;
}

interface NoIcon {
  startIcon?: never;
  endIcon?: never;
}
interface StartIcon {
  startIcon: ReactElement;
  endIcon?: never;
}
interface EndIcon {
  startIcon?: never;
  endIcon: ReactElement;
}

export type ButtonIconProps = NoIcon | StartIcon | EndIcon;

export type ButtonProps = ButtonCommonProps & ButtonIconProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      type = 'button',
      label,
      onClick,
      size = 'md',
      fullWidth = false,
      isLoading = false,
      className,
      surfaceClassName,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const { startIcon, endIcon, linkType, buttonProps, ...restProps } = props;

    const { isLink, shouldShowLoader, buttonBaseProps } = useGetButtonProps(isLoading, restProps, variant);
    const shouldShowFullWidth = fullWidth && variant !== 'link';

    const { color: onSurface } = useSurface();

    let variantColor: SurfaceColor;
    switch (variant) {
      case 'primary':
        variantColor = 'Primary';
        break;
      case 'secondary':
        variantColor = 'Secondary';
        break;
      case 'tertiary':
        variantColor = onSurface;
        break;
      case 'link':
        variantColor = onSurface;
        break;
      default:
        variantColor = 'Primary';
    }

    const { classes, cx } = useStyles({ variantColor });
    const sizeClassName = variant !== 'link' && (classes as Record<string, string>)[`size${capitalize(size)}`];

    return (
      <Surface
        color={variantColor}
        className={cx(classes.surface, { [classes.fullWidth]: shouldShowFullWidth }, surfaceClassName)}
      >
        <SpinnerWithBackdrop
          className={cx(
            { [classes.tertiaryButtonBackdrop]: variant === 'tertiary', [classes.fullWidth]: shouldShowFullWidth },
            containerClassName
          )}
          isLoading={shouldShowLoader}
          isBackdropOpaque
        >
          <MuiButton
            type={isLink ? undefined : type}
            className={cx(
              classes.root,
              sizeClassName,
              {
                [classes.button]: variant !== 'link',
                [classes.tertiaryButton]: variant === 'tertiary',
                [classes.variantLink]: variant === 'link',
                [classes.linkTypeDefault]: variant === 'link' && linkType !== 'primary',
                [classes.linkTypePrimary]: variant === 'link' && linkType === 'primary',
              },
              className
            )}
            classes={{
              startIcon: classes.startIcon,
              endIcon: classes.endIcon,
            }}
            startIcon={startIcon}
            endIcon={endIcon}
            fullWidth={fullWidth}
            onClick={onClick}
            disableElevation
            ref={ref}
            {...restProps}
            {...buttonBaseProps}
            {...buttonProps}
          >
            {label}
          </MuiButton>
        </SpinnerWithBackdrop>
      </Surface>
    );
  }
);
Button.displayName = 'Button';

export default Button;
