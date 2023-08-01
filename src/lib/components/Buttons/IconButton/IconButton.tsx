import type { AriaAttributes, ReactElement, MouseEventHandler, FC } from 'react';
import React, { useState, forwardRef } from 'react';

import { useSurface } from '../../../../themes/core';
import ButtonBase from '../../Surfaces/ButtonBase';
import useStyles from './IconButton.styles';
import Tooltip from '../../Tooltip';

export interface IconButtonProps extends AriaAttributes {
  icon: ReactElement;
  onClick: MouseEventHandler<HTMLButtonElement>;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
  type?: 'submit' | 'button';
  focus?: 'inset' | 'out';
  tooltipLabel?: string;
  tabIndex?: number;
}

const TooltipWrapper: FC<{ tooltipLabel?: string; shouldShowTooltip?: boolean }> = ({
  tooltipLabel,
  shouldShowTooltip,
  children,
}) => {
  if (tooltipLabel) {
    return <Tooltip label={shouldShowTooltip ? tooltipLabel : ''}>{children}</Tooltip>;
  }
  return <>{children}</>;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', disabled = false, onClick, className, focus = 'out', tooltipLabel, ...props }, ref) => {
    const { color: onSurface } = useSurface();
    const { classes, cx } = useStyles();
    const [shouldShowTooltip, setShouldShowTooltip] = useState(true);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setShouldShowTooltip(false);
      onClick(event);
    };

    const handleMouseLeave = () => {
      if (!shouldShowTooltip) setShouldShowTooltip(true);
    };

    return (
      <TooltipWrapper tooltipLabel={tooltipLabel} shouldShowTooltip={shouldShowTooltip}>
        <ButtonBase
          ref={ref}
          disabled={disabled}
          className={cx(classes.root, className)}
          onClick={handleClick}
          onMouseLeave={handleMouseLeave}
          color={onSurface}
          focus={focus}
          {...props}
        >
          {React.cloneElement(icon, { size })}
        </ButtonBase>
      </TooltipWrapper>
    );
  }
);
IconButton.displayName = 'IconButton';

export default IconButton;
