import React, { useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { default as MuiAccordionSummary } from '@mui/material/AccordionSummary';
import ButtonBase from '../../Surfaces/ButtonBase';
import Divider from '../../Divider';
import { Plus, Minus } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import Typography from '../../Typography';
import useStyles from './AccordionSummary.styles';
import type { DataAttributes } from '../../../types/common';
import Badge from '../../Badge';
import type { SurfaceColors } from '../Accordion.types';

export interface AccordionSummaryProps {
  id: string;
  title: ReactNode;
  expanded: boolean;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  surfaceColor?: SurfaceColors;
  badgeCount?: number;
}

interface BaseProps {
  children: React.ReactChildren;
  [key: string]: unknown;
}

const AccordionSummary: FC<AccordionSummaryProps> = ({
  id,
  title,
  expanded,
  buttonProps,
  surfaceColor = '100',
  badgeCount,
}) => {
  const { classes } = useStyles({ surface: surfaceColor });

  const Base = useMemo(
    () =>
      React.forwardRef<HTMLElement, BaseProps>(({ children, ...props }, ref) => {
        return (
          <ButtonBase {...buttonProps} color={surfaceColor} focus="inset" {...props} ref={ref}>
            {children}
          </ButtonBase>
        );
      }),
    [buttonProps, surfaceColor]
  );

  return (
    <>
      <MuiAccordionSummary
        id={id}
        aria-controls={id}
        expandIcon={<Icon icon={expanded ? Minus : Plus} />}
        className={classes.summary}
        classes={{
          content: classes.content,
          expanded: classes.expanded,
          expandIconWrapper: classes.expandIcon,
        }}
        component={Base}
      >
        <Badge count={badgeCount} isFullWidth variant="primary" badgeClassName={classes.badge}>
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
        </Badge>
      </MuiAccordionSummary>
      {!expanded && <Divider />}
    </>
  );
};

export default AccordionSummary;
