import React from 'react';
import InputAdornment from '../../TextField/InputAdornment';
import type { Value } from '../Select.types';
import useStyles from './StartAdornment.styles';

type Props<T, Multiple> = {
  value: Value<T, Multiple>;
  multiple: boolean;
  isDisabled: boolean;
  isEachOptionSelected: boolean;
  adjustToBottom: boolean;
  getOptionLabel: (value: T) => string;
  getOptionStartIcon?: (option: T, params?: { isInTextArea?: boolean }) => React.ReactNode;
};

export default function StartAdornment<T, Multiple>({
  value,
  multiple,
  isDisabled,
  isEachOptionSelected,
  adjustToBottom,
  getOptionLabel,
  getOptionStartIcon,
}: Props<T, Multiple>) {
  const { cx, classes } = useStyles();

  const multipleValue = (() => {
    if (!multiple || !value) {
      return;
    }
    if (!(value as Value<T, true>).length) {
      return;
    }
    if ((value as Value<T, true>).length === 1) {
      return (
        <InputAdornment
          position="start"
          adjustToBottom={adjustToBottom}
          className={cx(classes.multipleInputAdornment, { [classes.disabledInputAdornment]: isDisabled })}
          disableTypography
        >
          {getOptionStartIcon?.((value as Value<T, true>)[0])}
          {getOptionLabel((value as Value<T, true>)[0]) || ''}
        </InputAdornment>
      );
    }
    return (
      <InputAdornment
        position="start"
        adjustToBottom={adjustToBottom}
        className={cx(classes.multipleInputAdornment, classes.multipleValueIndicator, {
          [classes.disabledInputAdornment]: isDisabled,
        })}
        disableTypography
      >
        {isEachOptionSelected ? 'All selected' : `${(value as Value<T, true>).length} selected`}
      </InputAdornment>
    );
  })();

  if (multipleValue) {
    return multipleValue;
  }
  if (getOptionStartIcon && value) {
    return (
      <InputAdornment position="start" adjustToBottom={adjustToBottom} disableTypography>
        {getOptionStartIcon(value as T, { isInTextArea: true })}
      </InputAdornment>
    );
  }
  return null;
}
