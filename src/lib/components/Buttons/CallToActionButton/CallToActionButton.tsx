import type { MouseEventHandler, ReactElement } from 'react';
import React, { forwardRef } from 'react';
import SpinnerWithBackdrop from '../../ProgressIndicators/Spinner/SpinnerWithBackdrop';
import ButtonBase from '../../Surfaces/ButtonBase';
import type { ButtonBaseProps } from '../../ButtonBase';
import Typography from '../../Typography';
import useStyles from './CallToActionButton.styles';
import useGetButtonProps from '../Button/helpers/useGetButtonProps';
import type { DataAttributes } from '../../../types/common';

export interface BasicProps extends ButtonBaseProps {
  icon?: ReactElement;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & DataAttributes;
}

export type OptionalLabel = { label?: string; icon: ReactElement };
export type OptionalIcon = { label: string; icon?: ReactElement };

export type CallToActionButtonProps = (OptionalLabel | OptionalIcon) & BasicProps;

const COLORS = {
  primary: 'Primary',
  secondary: 'Secondary',
} as const;

const CallToActionButton = forwardRef<HTMLButtonElement, CallToActionButtonProps>(
  ({ icon, label, variant = 'primary', isLoading, className, ...props }, ref) => {
    const { classes, cx } = useStyles({ withIcon: !!icon });

    const { shouldShowLoader, buttonBaseProps } = useGetButtonProps(isLoading, props);

    return (
      <ButtonBase
        ref={ref}
        {...props.buttonProps}
        color={COLORS[variant]}
        className={cx(classes.root, className)}
        onClick={props.onClick}
        {...buttonBaseProps}
      >
        <div className={classes.inner}>
          <SpinnerWithBackdrop isLoading={shouldShowLoader} isBackdropOpaque>
            <div className={cx(classes.content, icon && !label && classes.iconOnly)}>
              {icon && React.cloneElement(icon, { size: 'md' })}
              {label && (
                <Typography component="span" variant="h4" headerType="commercial" className={classes.label}>
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
CallToActionButton.displayName = 'CallToActionButton';

export default CallToActionButton;
