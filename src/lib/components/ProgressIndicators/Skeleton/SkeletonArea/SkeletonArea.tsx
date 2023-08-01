import type { FC } from 'react';
import React from 'react';
import { Skeleton } from '@mui/material';
import { useSurface } from '../../../../../themes/core';
import useStyles from './SkeletonArea.styles';

export interface SkeletonAreaProps {
  width: string | number;
  height: string | number;
  className?: string;
}

const SkeletonArea: FC<SkeletonAreaProps> = ({ width = '100%', height, className }) => {
  const { color: onSurface } = useSurface();
  const { classes, cx } = useStyles({ onSurface, width, height });

  return (
    <Skeleton
      data-testid="skeleton-area"
      className={cx(classes.root, className)}
      variant="rectangular"
      animation="wave"
    />
  );
};

export default SkeletonArea;
