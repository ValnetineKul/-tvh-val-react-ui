import type { FC, ReactNode } from 'react';
import React from 'react';
import Stepper from '@mui/material/Stepper';
import StepConnector from './StepConnector';
import useStyles from './StepIndicator.styles';

export interface StepIndicatorProps {
  activeStep: number;
  children: ReactNode;
  className?: string;
}

const StepIndicator: FC<StepIndicatorProps> = ({ children, activeStep, className }) => {
  const { classes } = useStyles();

  return (
    <Stepper
      nonLinear
      alternativeLabel
      activeStep={activeStep}
      connector={<StepConnector />}
      className={className}
      classes={{
        root: classes.root,
      }}
    >
      {children}
    </Stepper>
  );
};
export default StepIndicator;
