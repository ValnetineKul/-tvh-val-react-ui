import React from 'react';
import type { FC } from 'react';

import { default as MuiInputAdornment } from '@mui/material/InputAdornment';
import useStyles from './InputAdornment.styles';

export interface InputAdornmentProps {
  position: 'start' | 'end';
  disableTypography?: boolean;
  adjustToBottom?: boolean;
  className?: string;
}

const InputAdornment: FC<InputAdornmentProps> = ({ adjustToBottom = false, className, ...props }) => {
  const { classes, cx } = useStyles();

  const rootClassName = cx(classes.root, className, { [classes.adjustToBottom]: adjustToBottom });

  return <MuiInputAdornment {...props} className={rootClassName} />;
};

export default InputAdornment;
