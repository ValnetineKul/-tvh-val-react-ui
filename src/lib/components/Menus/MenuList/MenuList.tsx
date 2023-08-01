import type { FC } from 'react';
import React from 'react';
import { default as MuiMenuList } from '@mui/material/MenuList';

export interface MenuListProps {
  className?: string;
}

const MenuList: FC<MenuListProps> = ({ children, className }) => {
  return <MuiMenuList className={className}>{children}</MuiMenuList>;
};
export default MenuList;
