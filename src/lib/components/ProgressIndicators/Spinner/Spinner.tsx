import type { FC } from 'react';
import React from 'react';
import { CircularProgress } from '@mui/material';
import useStyles from './Spinner.styles';

enum SizesEnum {
  'sm' = 12,
  'md' = 19,
  'lg' = 36,
}

type Size = keyof typeof SizesEnum;

export interface SpinnerProps {
  size?: Size;
  className?: string;
  spinnerClassName?: string;
}

const Spinner: FC<SpinnerProps> = ({ size = 'md', className, spinnerClassName }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.spinnerWrapper, className)}>
      <CircularProgress className={cx(classes.spinner, spinnerClassName)} thickness={6.2} size={SizesEnum[size]} />
    </div>
  );
};

export default Spinner;
