import type { FC } from 'react';
import React from 'react';
import type { NumberFormatValues } from 'react-number-format';
import NumberFormat from 'react-number-format';

export interface NumberFormatInputProps {
  value?: number | string;
  inputRef?: React.RefObject<HTMLInputElement>;
  decimalScale?: number;
  thousandSeparator?: string;
  decimalSeparator?: string;
  fixedDecimalScale?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: () => void;
  checkValueIsValid?: (values: NumberFormatValues) => boolean;
}

const NumberFormatInput: FC<NumberFormatInputProps> = ({
  inputRef,
  decimalScale,
  thousandSeparator,
  decimalSeparator,
  fixedDecimalScale = false,
  onChange,
  onValueChange,
  checkValueIsValid,
  ...props
}) => {
  return (
    <NumberFormat
      {...props}
      getInputRef={inputRef}
      isAllowed={checkValueIsValid}
      onChange={onChange}
      onValueChange={onValueChange}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
    />
  );
};

export default NumberFormatInput;
