import type { FC, ReactElement } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import useScreenSize from '../../../hooks/useScreenSize';
import Typography from '../../Typography';
import Tooltip from '../../Tooltip';
import useStyles from './SegmentItem.styles';
import Divider from '../../Divider';

export interface SegmentItemProps {
  id: string;
  name: string;
  checked: boolean;
  label: string;
  value: string;
  isFirstSegment: boolean;
  isLastSegment: boolean;
  isSelectedDivider: boolean;
  index: number;
  onSegmentClick: (value: string, index: number) => void;
  icon?: ReactElement;
  disabled?: boolean;
}

const SegmentItem: FC<SegmentItemProps> = ({
  id,
  name,
  checked,
  label,
  value,
  isFirstSegment,
  isLastSegment,
  isSelectedDivider,
  index,
  onSegmentClick,
  icon,
  disabled,
}) => {
  const { classes, cx } = useStyles();
  const { isTabletUp } = useScreenSize('Tablet');

  const [shouldShowTooltip, setShouldShowTooltip] = useState(false);
  const labelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const compareLabelSize = () => {
      const isBigger =
        label && labelRef && labelRef.current && labelRef.current.scrollWidth > labelRef.current.clientWidth;
      setShouldShowTooltip(!!isBigger);
    };

    compareLabelSize();

    window.addEventListener('resize', compareLabelSize);
    return () => {
      window.removeEventListener('resize', compareLabelSize);
    };
  }, [label]);

  const isDisableHover = !icon && (disabled || !shouldShowTooltip);

  function handleChange() {
    onSegmentClick(value, index);
  }

  return (
    <div
      className={cx({
        [classes.iconSegment]: !!icon,
        [classes.segmentItem]: !icon,
        [classes.widthForTrancation]: !icon && isTabletUp,
      })}
    >
      <div className={cx(classes.wrapper)}>
        <input
          type="radio"
          value={value}
          id={id}
          name={name}
          onChange={handleChange}
          checked={checked}
          className={classes.input}
          disabled={disabled}
        />
        <label htmlFor={id} className={cx(classes.label)}>
          <span
            className={cx(classes.content, {
              [classes.firstOfType]: isFirstSegment,
              [classes.lastOfType]: isLastSegment,
              [classes.firstOfTypeChecked]: isFirstSegment && checked,
              [classes.lastOfTypeChecked]: isLastSegment && checked,
            })}
          >
            <Tooltip
              label={label}
              disableHoverListener={isDisableHover}
              className={cx({ [classes.truncate]: isTabletUp })}
            >
              {icon ? (
                React.cloneElement(icon, { size: 'sm', className: classes.icon })
              ) : (
                <Typography
                  variant="body400"
                  component="span"
                  ref={labelRef}
                  className={cx({ [classes.truncate]: isTabletUp })}
                >
                  {label}
                </Typography>
              )}
            </Tooltip>
          </span>
        </label>
        {!isLastSegment && (
          <Divider
            direction="vertical"
            className={cx(classes.divider, { [classes.selectedDivider]: isSelectedDivider })}
          />
        )}
      </div>
    </div>
  );
};

export default SegmentItem;
