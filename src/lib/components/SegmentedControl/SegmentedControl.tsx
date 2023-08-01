import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';
import useStyles from './SegmentedControl.styles';
import SegmentItem from './SegmentItem';

export interface Segment {
  label: string;
  value: string;
  icon?: ReactElement;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  name: string;
  segmentList: Segment[];
  onSegmentChange: (value: string, id: number) => void;
  defaultIndex?: number;
  className?: string;
}

const SegmentedControl: FC<SegmentedControlProps> = ({
  name,
  segmentList,
  defaultIndex = 0,
  onSegmentChange,
  className,
}) => {
  const { classes, cx } = useStyles();

  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleChange = (value: string, index: number) => {
    if (onSegmentChange) {
      onSegmentChange(value, index);
    }
    setActiveIndex(index);
  };

  return (
    <fieldset className={cx(classes.fieldset, className)}>
      <legend className={classes.visuallyHidden}>{name}</legend>
      <div className={classes.controls}>
        {segmentList.map((item, i) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { label, value, icon, disabled } = item;
          const isChecked = i === activeIndex;
          const isFirstSegment = i === 0;
          const isLastSegment = i === segmentList.length - 1;
          const isSelectedDivider =
            (!disabled && isChecked) || (!segmentList[i + 1]?.disabled && i === activeIndex - 1);

          return (
            <SegmentItem
              key={value}
              label={label}
              value={value}
              icon={icon}
              disabled={disabled}
              checked={isChecked}
              isFirstSegment={isFirstSegment}
              isLastSegment={isLastSegment}
              isSelectedDivider={isSelectedDivider}
              name={name}
              id={`segment-item-${i}`}
              index={i}
              onSegmentClick={handleChange}
            />
          );
        })}
      </div>
    </fieldset>
  );
};

export default SegmentedControl;
