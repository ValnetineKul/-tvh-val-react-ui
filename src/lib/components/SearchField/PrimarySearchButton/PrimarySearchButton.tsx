import type { MouseEventHandler } from 'react';
import React, { forwardRef } from 'react';
import { capitalize } from '@mui/material/utils';
import type { Surface as SurfaceType } from '../../../../themes/core';
import SpinnerWithBackdrop from '../../ProgressIndicators/Spinner/SpinnerWithBackdrop';
import ButtonBase from '../../Surfaces/ButtonBase';
import Typography from '../../Typography';
import { Search } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import useStyles from './PrimarySearchButton.styles';

export interface PrimarySearchButtonProps {
  label?: string;
  size?: 'xs' | 'sm';
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  onClick?: MouseEventHandler;
  className?: string;
}

const PrimarySearchButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, PrimarySearchButtonProps>(
  ({ label, isLoading = false, size = 'sm', variant = 'secondary', onClick, className, ...props }, ref) => {
    const buttonColor = `${capitalize(variant)}` as SurfaceType;
    const { classes, cx } = useStyles({ buttonColor });

    const sizeClassName = (classes as Record<string, string>)[`size${capitalize(size)}`];

    return (
      <ButtonBase
        type="submit"
        ref={ref}
        color={buttonColor}
        onClick={onClick}
        className={cx(sizeClassName, className)}
        {...props}
      >
        <div className={classes.inner}>
          <SpinnerWithBackdrop isLoading={isLoading} isBackdropOpaque>
            <div className={cx(classes.content)}>
              <Icon icon={Search} size="md" />
              {label && (
                <Typography component="span" variant="body500" className={classes.label}>
                  {label}
                </Typography>
              )}
            </div>
          </SpinnerWithBackdrop>
        </div>
      </ButtonBase>
    );
  }
);
PrimarySearchButton.displayName = 'PrimarySearchButton';

export default PrimarySearchButton;
