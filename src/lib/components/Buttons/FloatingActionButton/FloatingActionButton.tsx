import type { FC } from 'react';
import React from 'react';

import ButtonBase from '../../Surfaces/ButtonBase';
import useStyles from './FloatingActionButton.styles';

export interface FloatingActionButtonProps extends React.AriaAttributes {
  icon: React.ReactElement;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const COLORS = {
  primary: 'Primary',
  secondary: 'Secondary',
} as const;

const FloatingActionButton: FC<FloatingActionButtonProps> = ({
  icon,
  disabled = false,
  onClick,
  className,
  variant = 'primary',
  ...props
}) => {
  const { classes, cx } = useStyles();

  return (
    <ButtonBase
      color={COLORS[variant]}
      disabled={disabled}
      className={cx(classes.root, className)}
      onClick={onClick}
      {...props}
    >
      {icon}
    </ButtonBase>
  );
};

export default FloatingActionButton;
