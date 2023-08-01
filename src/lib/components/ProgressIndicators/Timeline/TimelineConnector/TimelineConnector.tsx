import { capitalize } from '@mui/material';
import type { FC } from 'react';
import React from 'react';
import useStyles from './TimelineConnector.styles';

export interface TimelineConnectorProps {
  isCompleted: boolean;
  isAltering?: boolean;
  isFirst?: boolean;
  isReversed?: boolean;
  direction: 'horizontal' | 'vertical';
}

const TimelineConnector: FC<TimelineConnectorProps> = ({ direction, isCompleted, isAltering, isFirst, isReversed }) => {
  const { classes, cx } = useStyles();

  const rootClassName = cx(classes[`root${capitalize(direction)}` as const], {
    [classes.rootVerticalFirst]: isFirst && direction === 'vertical',
  });
  const lineClassName = classes[`line${capitalize(direction)}` as const];
  const lineCompletedClassName = classes[`lineCompleted${capitalize(direction)}` as const];

  return (
    <div
      className={cx(classes.root, rootClassName, {
        [classes.rootAlteringVertical]: isAltering && direction === 'vertical',
        [classes.rootReversedHorizontal]: isReversed && direction === 'horizontal',
      })}
    >
      <span className={cx(classes.line, lineClassName, { [lineCompletedClassName]: isCompleted })} />
    </div>
  );
};
export default TimelineConnector;
