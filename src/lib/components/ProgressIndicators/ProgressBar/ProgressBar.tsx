import LinearProgress from '@mui/material/LinearProgress';

import type { FC } from 'react';
import React from 'react';
import Typography from '../../Typography';
import useStyles from './ProgressBar.styles';

export interface ProgressBarProps {
  progress: number;
  endLabel?: string | React.ReactElement;
  className?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress, endLabel, className }) => {
  const { classes, cx } = useStyles();

  const renderEndLabel = () => {
    return typeof endLabel === 'string' ? (
      <Typography variant="body400" className={classes.endLabel}>
        {endLabel}
      </Typography>
    ) : (
      <div className={classes.endLabel}>{endLabel}</div>
    );
  };

  return (
    <div className={cx(classes.root, className)}>
      <LinearProgress className={cx(classes.progressBar)} variant="determinate" value={progress} />
      {endLabel && renderEndLabel()}
    </div>
  );
};
export default ProgressBar;
