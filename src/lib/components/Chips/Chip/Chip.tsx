import type { FC } from 'react';
import React from 'react';
import type { DataAttributes } from '../../../types/common';
import ButtonBase from '../../Surfaces/ButtonBase';
import Typography from '../../Typography';
import { DEFAULT_ICON_SIZE, surface } from './Chip.constants';
import useStyles from './Chip.styles';

interface CommonProps {
  label: string;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

interface NoIcon {
  startIcon?: never;
  endButtonProps?: never;
  endIcon?: never;
  onEndIconClick?: never;
}

interface StartIcon {
  startIcon: React.ReactElement;
  endIcon?: never;
  onEndIconClick?: never;
  endButtonProps?: never;
}

interface EndIcon {
  startIcon?: never;
  endIcon: React.ReactElement;
  onEndIconClick: React.MouseEventHandler<HTMLButtonElement>;
  endButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

export type ChipProps = CommonProps & (NoIcon | StartIcon | EndIcon);

const Chip: FC<ChipProps> = ({
  label,
  className,
  disabled = false,
  onClick,
  startIcon,
  endIcon,
  onEndIconClick,
  buttonProps,
  endButtonProps,
}) => {
  const { classes, cx } = useStyles();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const handleEndIconClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!disabled && onEndIconClick) {
      onEndIconClick(e);
    }
  };

  const rootClassName = cx(classes.root, {
    [classes.disabled]: disabled,
    [classes.hasEndIcon]: !!endIcon,
  });

  const endIconClassName = cx(classes.icon, classes.endIcon);

  return (
    <div className={cx(classes.wrapper, className)}>
      <>
        <ButtonBase
          border
          color={surface}
          disabled={disabled}
          className={rootClassName}
          onClick={handleClick}
          buttonProps={buttonProps}
        >
          {startIcon &&
            React.cloneElement(startIcon, {
              size: DEFAULT_ICON_SIZE,
              className: classes.icon,
            })}
          <Typography variant="body400" component="span">
            {label}
          </Typography>
        </ButtonBase>
        {endIcon && (
          <button
            type="button"
            disabled={disabled}
            className={endIconClassName}
            onClick={handleEndIconClick}
            {...(endButtonProps as EndIcon['endButtonProps'])}
          >
            {React.cloneElement(endIcon, { size: DEFAULT_ICON_SIZE })}
          </button>
        )}
      </>
    </div>
  );
};

export default Chip;
