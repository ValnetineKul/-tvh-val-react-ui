import type { FC, ReactElement } from 'react';
import React from 'react';

import useStyles from './ListLayout.styles';

export interface ListLayoutProps {
  className?: string;
  Toolbar: ReactElement;
  children: ReactElement;
  Pagination: ReactElement | null;
}

const ListLayout: FC<ListLayoutProps> = ({ className, Toolbar, children, Pagination }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.container, className)}>
      <div className={classes.toolbar}>{Toolbar}</div>
      <div className={classes.table}>{children}</div>
      {Pagination}
    </div>
  );
};

export default ListLayout;
