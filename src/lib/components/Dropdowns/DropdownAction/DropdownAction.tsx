import type { FC } from 'react';
import React from 'react';
import type { DataAttributes } from '../../../types/common';
import MenuItem from '../../Menus/MenuItem';
import { Plus } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import { surface } from './DropdawnAction.constants';
import useStyles from './DropdownAction.styles';

export interface DropdownActionProps {
  label: string;
  onClick?: React.MouseEventHandler;
  focusVisibleClassName?: string;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & DataAttributes;
}

const DropdownAction: FC<DropdownActionProps> = ({ label, onClick, focusVisibleClassName, ...props }) => {
  const { classes } = useStyles({ surface });

  return (
    <MenuItem
      color={surface}
      className={classes.root}
      elementType="div"
      startIcon={<Icon icon={Plus} />}
      label={label}
      onClick={onClick}
      focusVisibleClassName={focusVisibleClassName}
      {...props}
    />
  );
};

export default DropdownAction;
