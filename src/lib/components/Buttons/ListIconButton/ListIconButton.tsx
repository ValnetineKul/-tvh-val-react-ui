import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material';
import { Plus, Check } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import useStyles from './ListIconButton.styles';
import type { DataAttributes } from '../../../types/common';
import ButtonBase from '../../Surfaces/ButtonBase';

export interface ListIconButtonProps {
  size?: 'sm' | 'md';
  checked?: boolean;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

const ListIconButton: FC<ListIconButtonProps> = ({
  size = 'md',
  checked = false,
  disabled = false,
  className,
  onClick,
  buttonProps,
}) => {
  const { classes, cx } = useStyles();

  const sizeClassName = (classes as Record<string, string>)[`size${capitalize(size)}`];

  const cls = cx(
    classes.root,
    sizeClassName,
    {
      [classes.checked]: checked,
    },
    className
  );

  return (
    <ButtonBase
      {...buttonProps}
      color="100"
      type="button"
      className={cls}
      disabled={disabled}
      onClick={onClick}
      aria-label="List icon button"
    >
      <Icon icon={checked ? Check : Plus} size={size} />
    </ButtonBase>
  );
};
export default ListIconButton;
