import type { FC } from 'react';
import React from 'react';
import { default as MuiStepConnector } from '@mui/material/StepConnector';
import useStyles from './StepConnector.styles';

export interface StepConnectorProps {
  className?: string;
}

const StepConnector: FC<StepConnectorProps> = ({ className }) => {
  const { classes } = useStyles();

  return (
    <MuiStepConnector
      classes={{
        alternativeLabel: classes.alternativeLabel,
        active: classes.active,
        completed: classes.completed,
        line: classes.line,
      }}
      className={className}
    />
  );
};
export default StepConnector;
