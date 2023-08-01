import React from 'react';
import type { FC, ReactNode } from 'react';

import type { InputLabelProps as MuiInputLabelProps } from '@mui/material/InputLabel';
import { default as MuiInputLabel } from '@mui/material/InputLabel';
import useStyles from './InputLabel.styles';
import Typography from '../Typography';

export interface InputLabelProps extends MuiInputLabelProps {
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  component?: ReactNode;
}

export type InputLabelPropsType = Omit<InputLabelProps, 'label'>;

const InputLabel: FC<InputLabelProps> = ({ required = false, disabled = false, className, label, ...props }) => {
  const { classes, cx } = useStyles();
  const rootClassName = cx(classes.root, className, { [classes.isRequired]: required, [classes.isDisabled]: disabled });

  return (
    <MuiInputLabel {...props} className={rootClassName}>
      <Typography variant="body400" component="span" className={classes.label}>
        {label}
      </Typography>
      {required && (
        <Typography variant="body400" component="span" className={classes.required}>
          *
        </Typography>
      )}
    </MuiInputLabel>
  );
};

export default InputLabel;
