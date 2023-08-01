import type { FC } from 'react';
import React from 'react';
import type { InputBaseComponentProps } from '@mui/material/InputBase';
import TextField from '../TextField';
import type { DataAttributes } from '../../types/common';
import useStyles from './TextArea.styles';

export interface TextAreaProps {
  label: string;
  id?: string;
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  characterCount?: boolean;
  maxLength?: number;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLDivElement>;
  inputElementRef?: React.Ref<HTMLInputElement>;
  autoFocus?: boolean;
  autoSelect?: boolean;
  helpText?: string;
  className?: string;
  inputProps?: InputBaseComponentProps & DataAttributes;
}

const TextArea: FC<TextAreaProps> = ({
  rows = 2,
  maxRows,
  minRows,
  autoFocus = false,
  autoSelect = false,
  inputProps,
  ...props
}) => {
  const { classes } = useStyles();
  const actualRows = maxRows > 0 || minRows > 0 ? undefined : rows;

  return (
    <TextField
      {...props}
      rows={actualRows}
      minRows={minRows}
      maxRows={maxRows}
      multiline
      inputMultilineClassName={classes.root}
      inputClassName={classes.input}
      autoFocus={autoFocus}
      autoSelect={autoSelect}
      inputProps={inputProps}
    />
  );
};

export default TextArea;
