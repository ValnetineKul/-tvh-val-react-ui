import React, { useState } from 'react';
import type { FC } from 'react';
import { default as MUIDesktopDatePicker } from '@mui/lab/DesktopDatePicker';
import { default as MUITextField } from '@mui/material/TextField';
import type { InputBaseComponentProps, InputBaseProps } from '@mui/material/InputBase';
import { default as MuiInputBase } from '@mui/material/InputBase';
import Icon from '../../Icon';
import { Calendar } from '../../Icon/icons/functional';
import type { TextFieldProps } from '../../TextField';
import TextField from '../../TextField';
import type { DataAttributes } from '../../../types/common';
import useStyles from './DateTextField.styles';

export interface DateTextFieldProps {
  format?: string;
  isDateRange?: boolean;
  adornmentInputValue?: Date | null;
  startInputId?: string;
  endInputId?: string;
  setIsInputFocused: (isFocused: boolean) => void;
  onAdornmentInputValueChange: (dateValue: Date | null) => void;
  inputPropsDateRangeTo?: InputBaseComponentProps & DataAttributes;
  inputPropsDateRangeFrom?: InputBaseComponentProps & DataAttributes;
}

const InputComponent = React.forwardRef<HTMLInputElement>(
  (props: { isDateRange?: boolean; label?: string } & InputBaseProps & DataAttributes, ref) => {
    const { classes, cx } = useStyles();

    const { isDateRange, label, color, id, className, ...remainingProps } = props;

    return (
      <>
        <label className={classes.visuallyHidden} htmlFor={id}>
          {isDateRange ? 'End date' : label}
        </label>
        <MuiInputBase
          {...remainingProps}
          id={id}
          ref={ref}
          className={cx(classes.adornmentInputRoot, classes.input, className)}
        />
      </>
    );
  }
);

const DateTextField: FC<TextFieldProps & DateTextFieldProps> = ({
  format,
  adornmentInputValue,
  setIsInputFocused,
  onAdornmentInputValueChange,
  isDateRange,
  inputPropsDateRangeTo,
  inputPropsDateRangeFrom,
  label,
  focused,
  disabled,
  readOnly,
  inputProps,
  startInputId,
  endInputId,
  ...props
}) => {
  const { classes } = useStyles();
  const [isAdornmentInputFocused, setIsAdornmentInputFocused] = useState(false);

  const handleOnAdornmentInputFocus = (isFocused: boolean) => {
    setIsAdornmentInputFocused(isFocused);
    setIsInputFocused(isFocused);
  };

  return (
    <TextField
      {...props}
      type="text"
      id={isDateRange ? endInputId : label}
      placeholder={format?.toLowerCase()}
      label={label}
      InputLabelProps={{ component: 'span', htmlFor: undefined }}
      focused={focused || isAdornmentInputFocused}
      disabled={disabled}
      readOnly={readOnly}
      startIcon={<Icon icon={Calendar} />}
      inputComponent={InputComponent}
      inputProps={{ ...inputProps, ...inputPropsDateRangeTo, readOnly, isDateRange, label }}
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}
      startAdornment={
        isDateRange ? (
          <MUIDesktopDatePicker
            disableOpenPicker
            inputFormat={format}
            open={false}
            disabled={disabled}
            value={adornmentInputValue}
            onChange={onAdornmentInputValueChange}
            renderInput={(textFieldProps) => {
              const { type, ...remainingInputProps } = textFieldProps.inputProps;
              return (
                <MUITextField
                  {...textFieldProps}
                  id={startInputId}
                  autoComplete="off"
                  placeholder={format?.toLowerCase()}
                  label="Start date"
                  InputLabelProps={{
                    shrink: true,
                    className: classes.visuallyHidden,
                    htmlFor: startInputId,
                    id: undefined,
                  }}
                  onFocus={() => handleOnAdornmentInputFocus(true)}
                  onBlur={() => handleOnAdornmentInputFocus(false)}
                  className={classes.adornmentInputRoot}
                  inputProps={{ ...remainingInputProps, ...inputPropsDateRangeFrom, readOnly }}
                />
              );
            }}
          />
        ) : null
      }
    />
  );
};

export default DateTextField;
