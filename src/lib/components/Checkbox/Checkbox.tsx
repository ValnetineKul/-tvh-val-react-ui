import type { FC } from 'react';
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { default as MuiCheckbox } from '@mui/material/Checkbox';
import { Check, Minus } from '../Icon/icons/functional';
import Icon from '../Icon';
import Typography from '../Typography';
import useStyles from './Checkbox.styles';
import type { DataAttributes } from '../../types/common';

export interface CheckboxProps {
  label?: string | React.ReactElement;
  value?: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  formControlLabelClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputProps?: React.HTMLAttributes<HTMLInputElement> & DataAttributes;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  value,
  name,
  checked,
  disabled = false,
  indeterminate = false,
  className,
  formControlLabelClassName,
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
          [classes.disabledChecked]: disabled,
          [classes.checked]: !disabled,
        })}
      >
        {indeterminate ? <Icon icon={Minus} size="sm" /> : <Icon icon={Check} size="sm" />}
      </span>
    );
  };

  const renderCheckbox = () => {
    return (
      <MuiCheckbox
        inputProps={inputProps}
        name={name}
        value={value}
        className={classes.checkbox}
        checked={checked}
        disabled={disabled}
        indeterminate={indeterminate}
        onChange={onChange}
        icon={renderIcon()}
        checkedIcon={renderCheckedIcon()}
        indeterminateIcon={renderCheckedIcon()}
        disableRipple
      />
    );
  };

  if (!label) {
    return renderCheckbox();
  }

  return (
    <FormControlLabel
      classes={{
        root: cx(classes.root, formControlLabelClassName),
        label: cx({ [classes.label]: !!label }, className),
        disabled: classes.disabled,
      }}
      label={<Typography component="span">{label}</Typography>}
      value={value}
      control={renderCheckbox()}
    />
  );
};

export default Checkbox;
