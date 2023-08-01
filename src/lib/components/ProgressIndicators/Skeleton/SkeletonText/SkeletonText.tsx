import type { FC } from 'react';
import React from 'react';
import { Skeleton } from '@mui/material';
import { useSurface } from '../../../../../themes/core';
import useStyles from './SkeletonText.styles';

export interface SkeletonTextProps {
  heading?: 'h1' | 'h2' | 'h3' | 'h4';
  body?: 'body1' | 'body2';
  bodyLinesCount: number;
  width?: number | string;
  containerClassName?: string;
  headingClassName?: string;
  bodyTextClassName?: string;
  lastLineClassName?: string;
}

const SkeletonText: FC<SkeletonTextProps> = ({
  heading,
  body = 'body1',
  bodyLinesCount = 3,
  width = '100%',
  headingClassName,
  bodyTextClassName,
  lastLineClassName,
  containerClassName,
}) => {
  const { color: onSurface } = useSurface();
  const { classes, cx } = useStyles({ onSurface, width });

  return (
    <div className={cx(classes.root, containerClassName)} data-testid="skeleton-text">
      {heading && (
        <Skeleton
          component="div"
          variant="rectangular"
          animation="wave"
          className={cx(classes[heading], classes.skeletonAnimation, classes.heading, headingClassName)}
        />
      )}

      {bodyLinesCount > 0 && (
        <div className={classes.bodyWrapper}>
          {new Array(bodyLinesCount).fill(null).map((_, i) => (
            <Skeleton
              component="div"
              variant="rectangular"
              animation="wave"
              key={i}
              className={cx(
                classes[body],
                classes.skeletonAnimation,
                bodyTextClassName,
                bodyLinesCount - 1 === i ? lastLineClassName : null
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkeletonText;
