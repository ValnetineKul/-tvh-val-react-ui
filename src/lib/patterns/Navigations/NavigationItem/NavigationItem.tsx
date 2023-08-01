import type { FC } from 'react';
import React from 'react';
import { useSurface } from '../../../../themes/core';
import { useButtonBase } from '../../../components/ButtonBase';
import MenuItem from '../../../components/Menus/MenuItem';
import useStyles from './NavigationItem.styles';
import type { NavigationItemProps } from './NavigationItem.types';

const NavigationItem: FC<NavigationItemProps> = ({
  selected = false,
  className,
  onClick,
  itemProps,
  label,
  horizontal: isHorizontal,
  icon,
  vertical: isVertical,
  startIcon,
  endIcon,
  subLabel,
  tag,
  ...props
}) => {
  const { classes, cx } = useStyles();
  const buttonBaseProps = useButtonBase(props);
  const { color: onSurface } = useSurface();

  const commonProps = {
    ...buttonBaseProps,
    selected,
    color: onSurface,
    onClick,
    buttonProps: itemProps,
  };

  if (isHorizontal) {
    const commonHorizontalProps = {
      ...commonProps,
      className: cx({ [classes.horizontalItem]: isHorizontal, [classes.selected]: selected }, className),
      buttonBaseClassName: classes.horizontalButtonBase,
    };

    return (
      <>
        {!icon && label && <MenuItem {...commonHorizontalProps} label={label} />}
        {icon && !label && <MenuItem {...commonHorizontalProps} label="" startIcon={icon} />}
        {icon && label && <MenuItem {...commonHorizontalProps} label={label} startIcon={icon} />}
      </>
    );
  }

  if (isVertical) {
    const commonVerticalProps = {
      ...commonProps,
      className: cx({ [classes.verticalItem]: isVertical, [classes.selected]: selected }, className),
    };

    return (
      <>
        {!startIcon && !endIcon && !subLabel && label && <MenuItem {...commonVerticalProps} label={label} />}
        {startIcon && label && !endIcon && !subLabel && (
          <MenuItem {...commonVerticalProps} label={label} startIcon={startIcon} />
        )}
        {endIcon && label && !startIcon && <MenuItem {...commonVerticalProps} label={label} endIcon={endIcon} />}
        {startIcon && endIcon && label && (
          <MenuItem {...commonVerticalProps} label={label} startIcon={startIcon} endIcon={endIcon} />
        )}
        {subLabel && label && !startIcon && !tag && (
          <MenuItem {...commonVerticalProps} label={label} subLabel={subLabel} />
        )}
        {subLabel && label && startIcon && tag && (
          <MenuItem {...commonVerticalProps} label={label} tag={tag} subLabel={subLabel} startIcon={startIcon} />
        )}
      </>
    );
  }

  return null;
};

export default NavigationItem;
