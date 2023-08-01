import type { FC } from 'react';
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { default as MuiSwitch } from '@mui/material/Switch';
import Typography from '../Typography';
import useStyles from './Switch.styles';
import type { DataAttributes } from '../../types/common';

export interface SwitchProps {
  label?: string | React.ReactElement;
  value?: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | null, checked: boolean) => void;
  spaceBetween?: boolean;
  inputProps?: React.HTMLAttributes<HTMLInputElement> & DataAttributes;
}

const Switch: FC<SwitchProps> = ({
  label,
  value,
  name,
  checked,
  disabled = false,
  onChange,
  spaceBetween = false,
  inputProps,
}) => {
  const { classes, cx } = useStyles();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (onChange && event.key === 'Enter') {
      event.preventDefault();
      onChange(null, !checked);
    }
  };

  const renderSwitch = () => {
    return (
      <MuiSwitch
        inputProps={inputProps}
        name={name}
        value={value}
        classes={{
          root: classes.switch,
          switchBase: classes.switchBase,
          checked: classes.checked,
          thumb: classes.thumb,
          disabled: classes.disabled,
          track: classes.track,
        }}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        checked={checked}
        disabled={disabled}
        disableRipple
      />
    );
  };

  if (!label) {
    return renderSwitch();
  }

  return (
    <FormControlLabel
      labelPlacement="start"
      classes={{
        root: cx(classes.root, { [classes.spaceBetween]: spaceBetween && !!label }),
        label: cx({ [classes.label]: !!label }),
        disabled: classes.disabled,
      }}
      label={<Typography component="span">{label}</Typography>}
      value={value}
      control={renderSwitch()}
    />
  );
};

export default Switch;
