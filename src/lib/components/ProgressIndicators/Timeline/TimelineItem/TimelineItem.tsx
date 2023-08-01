import { capitalize } from '@mui/material';
import type { FC } from 'react';
import React from 'react';
import useStyles from './TimelineItem.styles';
import Icon from '../../../Icon';
import { Check, ExclamationTriangle } from '../../../Icon/icons/functional';
import StatusTag from '../../../Tags/StatusTag';
import Typography from '../../../Typography';

export interface TimelineItemProps {
  className?: string;
  label: string;
  description?: string | string[];
  direction: 'horizontal' | 'vertical';
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  isCurrent?: boolean;
  isCompleted?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isReversed?: boolean;
  hasWarning?: boolean;
}

const TimelineItem: FC<TimelineItemProps> = ({
  className,
  label,
  description,
  direction,
  icon,
  isCurrent,
  isCompleted,
  isFirst,
  isLast,
  isReversed,
  hasWarning,
}) => {
  const { classes, cx } = useStyles();

  const rootClassName = cx(classes[`root${capitalize(direction)}` as const], {
    [classes[`rootReversed${capitalize(direction)}` as const]]: isReversed,
    [classes.rootVerticalFirst]: isFirst && direction === 'vertical',
    [classes.rootVerticalLast]: isLast && direction === 'vertical',
  });
  const textRootClassName = cx(classes[`textRoot${capitalize(direction)}` as const], {
    [classes[`textRootReversed${capitalize(direction)}` as const]]: isReversed,
  });
  const tagClassName = cx({ [classes.tagReversedRoot]: isReversed && direction === 'horizontal' });

  const descriptionRootClassName = cx(classes.description, {
    [classes[`descriptionReversed${capitalize(direction)}` as const]]: isReversed,
  });

  const renderIcon = () => {
    if (hasWarning) {
      return ExclamationTriangle;
    }
    if (isCompleted) {
      return Check;
    }

    return icon;
  };

  const renderTag = () => {
    if (hasWarning) {
      return <StatusTag className={tagClassName} label={label} status="warning" size="sm" />;
    }
    if (isCompleted) {
      return <StatusTag className={tagClassName} label={label} status="success" size="sm" />;
    }
    if (isCurrent) {
      return <StatusTag className={tagClassName} label={label} status="neutral" size="sm" />;
    }

    return (
      <Typography className={classes.tagText} variant="body400" weight="emphasis">
        {label}
      </Typography>
    );
  };

  const renderDescription = () => {
    if (!description) return null;

    if (typeof description === 'string') return <Typography>{description}</Typography>;

    return description.map((descriptionItem, index) => <Typography key={index}>{descriptionItem}</Typography>);
  };

  return (
    <div className={cx(classes.root, rootClassName, className)}>
      <div
        className={cx(classes.iconRoot, {
          [classes.iconRootCompleted]: isCompleted,
          [classes.iconRootWarning]: hasWarning,
        })}
      >
        <Icon
          className={cx(classes.icon, {
            [classes.iconCompleted]: isCompleted,
            [classes.iconWarning]: hasWarning,
          })}
          icon={renderIcon()}
          size="sm"
        />
      </div>
      <div className={cx(classes.textRoot, textRootClassName)}>
        {renderTag()}
        <div className={descriptionRootClassName}>{renderDescription()}</div>
      </div>
    </div>
  );
};
export default TimelineItem;
