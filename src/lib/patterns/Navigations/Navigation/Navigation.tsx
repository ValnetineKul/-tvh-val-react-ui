import type { FC } from 'react';
import React from 'react';

import MenuList from '../../../components/Menus/MenuList';
import useStyles from './Navigation.styles';

export interface NavigationProps {
  className?: string;
}

const Navigation: FC<NavigationProps> = ({ children, className }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <MenuList className={classes.list}>{children}</MenuList>
    </div>
  );
};

export default Navigation;
