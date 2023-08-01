import type { FC } from 'react';
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { default as MuiRadio } from '@mui/material/Radio';

import Typography from '../../Typography';
import useStyles from './RadioButton.styles';
import type { DataAttributes } from '../../../types/common';

export interface RadioButtonProps {
  label: string;
  value: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputProps?: React.HTMLAttributes<HTMLInputElement> & DataAttributes;
}

const RadioButton: FC<RadioButtonProps> = ({
  label,
  value,
  name,
  checked,
  disabled = false,
  className,
  onChange,
  inputProps,
}) => {
  const { classes, cx } = useStyles();

  const renderIcon = () => {
    return (
      <span
        className={cx(classes.icon, {
          [classes.disabledUnchecked]: disabled,
          [classes.unchecked]: !disabled,
        })}
      />
    );
  };

  const renderCheckedIcon = () => {
    return (
      <span
        className={cx(classes.icon, {
          [classes.disabledCheckedIcon]: disabled,
          [classes.checkedIcon]: !disabled,
        })}
      />
    );
  };

  const renderRadio = () => {
    return (
      <MuiRadio
        inputProps={inputProps}
        name={name}
        value={value}
        className={classes.radio}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        icon={renderIcon()}
        checkedIcon={renderCheckedIcon()}
        disableRipple
      />
    );
  };

  if (!label) {
    return renderRadio();
  }

  return (
    <FormControlLabel
      classes={{ root: classes.root, label: cx(classes.label, className), disabled: classes.disabled }}
      label={<Typography component="span">{label}</Typography>}
      value={value}
      control={renderRadio()}
    />
  );
};

export default RadioButton;
