import type { FC, ReactNode } from 'react';
import React from 'react';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Typography from '../../Typography';
import useStyles from './RadioButtonGroup.styles';

export interface RadioButtonGroupProps {
  children: ReactNode;
  value: string;
  label?: string;
  required?: boolean;
  name?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  children,
  value,
  label,
  required = false,
  name,
  className,
  onChange,
}) => {
  const { classes } = useStyles();

  return (
    <FormControl component="fieldset" className={className}>
      {label && (
        <FormLabel component="legend">
          <Typography variant="body400" component="span" className={classes.label}>
            {label}
            {required && <span className={classes.asterisk}>&nbsp;*</span>}
          </Typography>
        </FormLabel>
      )}
      <RadioGroup value={value} onChange={onChange} classes={{ root: classes.root }} name={name}>
        {children}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
