import type { FC } from 'react';
import React from 'react';
import useStyles from './SkeletonCard.styles';

export interface SkeletonCardProps {
  width?: number | string;
  children?: React.ReactNode;
}

const SkeletonCard: FC<SkeletonCardProps> = ({ width = '100%', children }) => {
  const { classes } = useStyles({ width });

  return (
    <div data-testid="skeleton-card" className={classes.root}>
      {children}
    </div>
  );
};

export default SkeletonCard;
