import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material/utils';
import { useSurface } from '../../../themes/core';
import Surface from '../Surfaces/Surface';
import Typography from '../Typography';
import useStyles from './Badge.styles';

interface CommonProps {
  children?: React.ReactNode;
  count: number;
  overflowCount?: number;
  variant?: 'default' | 'primary';
  type?: 'standard' | 'dot';
  className?: string;
  badgeClassName?: string;
}

interface TextProps {
  isFullWidth?: boolean;
  isIcon?: false;
  iconSize?: never;
}

interface IconProps {
  isIcon: true;
  iconSize?: 'sm' | 'md';
}

export type BadgeProps = CommonProps & (IconProps | TextProps);

const Badge: FC<BadgeProps> = ({
  count,
  overflowCount = 999,
  variant = 'default',
  type = 'standard',
  children,
  className,
  badgeClassName,
  ...props
}) => {
  const { classes, cx } = useStyles();
  const { color: onSurface } = useSurface();

  const isIcon = 'isIcon' in props && props.isIcon;
  const iconSize = 'iconSize' in props && props.iconSize ? props.iconSize : 'md';
  const isFullWidth = 'isFullWidth' in props && props.isFullWidth;
  const isPrimaryInverted = variant === 'primary' && onSurface === 'Primary';

  const actualType = iconSize && iconSize === 'sm' ? 'dot' : type;
  const iconDotPositionClassName = (classes as Record<string, string>)[`dot${capitalize(iconSize)}`];

  const badgeClassNames = cx(
    classes.badge,
    {
      [classes.badge]: actualType === 'standard',
      [classes.dot]: actualType === 'dot',
      [classes.iconBadgePosition]: isIcon && actualType === 'standard',
      [iconDotPositionClassName]: isIcon && actualType === 'dot',
      [classes.textBadgePosition]: !isIcon && actualType === 'standard',
      [classes.textDotPosition]: !isIcon && actualType === 'dot',
    },
    badgeClassName
  );

  const getVariant = () => {
    if (variant === 'default') return '200';
    if (isPrimaryInverted) return '100';
    return 'Primary';
  };

  return (
    <div
      className={cx(
        classes.root,
        { [classes.fullWidth]: !isIcon && actualType === 'standard' && isFullWidth },
        className
      )}
    >
      {children}
      {count > 0 && (
        <Surface color={getVariant()} component="span" className={badgeClassNames}>
          {actualType === 'standard' && (
            <Typography
              variant="body300"
              component="span"
              weight="emphasis"
              className={cx(classes.badgeTypography, { [classes.invertedTypography]: isPrimaryInverted })}
            >
              {count > overflowCount ? `${overflowCount}+` : count}
            </Typography>
          )}
        </Surface>
      )}
    </div>
  );
};

export default Badge;
