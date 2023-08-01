import type { FC } from 'react';
import React from 'react';
import { default as MuiTooltip } from '@mui/material/Tooltip';

import Typography from '../Typography';
import useStyles from './Tooltip.styles';

export interface TooltipProps {
  label: string | JSX.Element;
  position?: 'bottom-end' | 'bottom-start' | 'bottom' | 'top-end' | 'top-start' | 'top';
  className?: string;
  enterTouchDelay?: number;
  children: React.ReactNode;
  disableHoverListener?: boolean;
}

const Tooltip: FC<TooltipProps> = ({
  label,
  children,
  position = 'bottom',
  className,
  enterTouchDelay = 700,
  disableHoverListener,
}) => {
  const { classes, cx } = useStyles();

  return (
    <MuiTooltip
      title={label}
      placement={position}
      classes={{
        tooltip: classes.tooltip,
        tooltipPlacementTop: classes.verticalPlacement,
        tooltipPlacementBottom: classes.verticalPlacement,
        tooltipPlacementLeft: classes.horizontalPlacement,
        tooltipPlacementRight: classes.horizontalPlacement,
      }}
      enterTouchDelay={enterTouchDelay}
      disableHoverListener={disableHoverListener}
      describeChild={label === ''}
    >
      <Typography className={cx(classes.wrapper, className)} variant="body400" component="div">
        {children}
      </Typography>
    </MuiTooltip>
  );
};

export default Tooltip;
