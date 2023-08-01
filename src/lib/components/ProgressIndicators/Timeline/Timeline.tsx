import { capitalize } from '@mui/material';
import type { ComponentProps, FC } from 'react';
import React from 'react';
import useStyles from './Timeline.styles';
import TimelineConnector from './TimelineConnector';
import TimelineItem from './TimelineItem';

type TimelineItemProps = ComponentProps<typeof TimelineItem>;
type Item = Omit<TimelineItemProps, 'children' | 'direction' | 'isCompleted' | 'isCurrent'>;

export interface TimelineProps {
  activeItem: number;
  items: Item[];
  className?: string;
  direction?: 'horizontal' | 'vertical';
  isAltering?: boolean;
}

const Timeline: FC<TimelineProps> = ({ activeItem, items, direction = 'horizontal', className, isAltering }) => {
  const { classes, cx } = useStyles();

  const rootClassName = cx(classes.root, classes[`root${capitalize(direction)}` as const], className, {
    [classes.rootAlteringHorizontal]: isAltering && direction === 'horizontal',
  });
  const itemRootAlteringClassName = classes[`itemRootAltering${capitalize(direction)}` as const];

  return (
    <div className={rootClassName}>
      {items.map((item, index) => {
        const isReversed = isAltering && index % 2 !== 0;

        return (
          <div
            className={cx(classes.itemRoot, {
              [itemRootAlteringClassName]: isAltering,
              [classes.itemRootReversedVertical]: isReversed && direction === 'vertical',
            })}
            key={index}
          >
            <TimelineItem
              {...item}
              className={cx({ [classes.itemAltering]: isAltering })}
              direction={direction}
              isCompleted={index < activeItem}
              isCurrent={index === activeItem}
              isFirst={index === 0}
              isLast={index === items.length - 1}
              isReversed={isReversed}
            />
            {index < items.length - 1 && (
              <TimelineConnector
                direction={direction}
                isCompleted={index < activeItem}
                isAltering={isAltering}
                isFirst={index === 0}
                isReversed={isReversed}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default Timeline;
