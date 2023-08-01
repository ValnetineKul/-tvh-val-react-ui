import type { InputBaseComponentProps } from '@mui/material';
import type { FC } from 'react';
import React, { useMemo, useCallback, forwardRef } from 'react';

import type { NumberFormatValues } from 'react-number-format';
import TextField from '../TextField';
import type { DataAttributes } from '../../types/common';
import NumberFormatInput from '../../../forms/NumberFormatInput';
import { useConfigContext } from '../../../themes/core';
import getSeparatorsForLocale from './helpers/getSeparatorsForLocale';

export interface NumberFieldProps {
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  id?: string;
  label?: string;
  value?: number | string;
  prefix?: string;
  suffix?: string;
  errorMessage?: string;
  negativeNumberErrorMessage?: string;
  placeholder?: string;
  inputClassName?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoSelect?: boolean;
  onChange?: (value: number | undefined) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  maxNumberOfDigits?: number;
  inputProps?: InputBaseComponentProps & DataAttributes;
}

const InputComponent = forwardRef((props, ref) => <NumberFormatInput {...props} inputRef={ref as never} />);

const NumberField: FC<NumberFieldProps> = ({
  value,
  errorMessage,
  negativeNumberErrorMessage = 'Negative numbers cannot be used',
  className,
  inputClassName,
  decimalScale,
  fixedDecimalScale = true,
  onChange,
  onBlur,
  onKeyDown,
  maxNumberOfDigits = 15,
  inputProps: incomingInputProps,
  inputRef,
  ...props
}) => {
  const [isNegativeNumber, setIsNegativeNumberError] = React.useState(false);

  const actualDecimalScale = React.useMemo(() => {
    if (decimalScale > 0) return decimalScale;
    return undefined;
  }, [decimalScale]);

  const errorMessageComposed = errorMessage || (isNegativeNumber && negativeNumberErrorMessage);

  const { locale } = useConfigContext();

  const { thousandSeparator, decimalSeparator } = useMemo(() => getSeparatorsForLocale(locale), [locale]);

  const checkRequiredLength = useCallback(
    (numberValue: string) => numberValue.length <= maxNumberOfDigits,
    [maxNumberOfDigits]
  );

  const handleChange = (numberValue: number | undefined) => {
    if (onChange) {
      isNegativeNumber && setIsNegativeNumberError(false);
      onChange(numberValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const { target, key } = event;

    if (key === '-') {
      event.preventDefault();
      return;
    }

    if (key === decimalSeparator) {
      const { value: targetValue, selectionStart } = target as HTMLInputElement;
      const decimalSeparatorPosition = targetValue.length - (actualDecimalScale || 0) - 1;
      if (selectionStart !== decimalSeparatorPosition) {
        event.preventDefault();
      }
      return;
    }

    if (key === 'ArrowUp') {
      if (onChange) {
        let newValue = value || 0;
        if (typeof newValue === 'string') {
          newValue = 0;
        } else {
          newValue += 1;
        }
        onChange(newValue);
      }
      return;
    }
    if (key === 'ArrowDown') {
      if (onChange) {
        let newValue = value || 0;
        if (typeof newValue === 'string' || newValue <= 0) {
          newValue = 0;
        } else {
          newValue -= 1;
        }
        onChange(newValue);
      }
      return;
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  const handlePasteNegativeDigit = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const { clipboardData } = event;
    const pastedData = clipboardData.getData('text');
    const pastedNumber = parseFloat(pastedData);
    if (pastedData.includes('-')) {
      event.preventDefault();
    }

    if (pastedNumber < 0) {
      event.preventDefault();
      setIsNegativeNumberError(true);
    }

    return null;
  };

  const inputProps: InputBaseComponentProps = {
    decimalScale: actualDecimalScale,
    thousandSeparator,
    decimalSeparator,
    fixedDecimalScale,
    onValueChange: (values: { floatValue: number }) => {
      const { floatValue } = values;
      handleChange(floatValue);
    },
    checkValueIsValid: (numberValue: NumberFormatValues) => checkRequiredLength(numberValue.value),
    ...(incomingInputProps || {}),
  };

  return (
    <TextField
      {...props}
      value={value}
      inputComponent={InputComponent}
      inputProps={inputProps}
      inputClassName={inputClassName}
      className={className}
      errorMessage={errorMessageComposed}
      inputElementRef={inputRef}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePasteNegativeDigit}
      autoComplete="off"
    />
  );
};

export default NumberField;
