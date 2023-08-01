import type { FC } from 'react';
import React from 'react';
import type { Props as InputMaskProps } from 'react-input-mask';
import InputMask from 'react-input-mask';

type MaskedInputProps = InputMaskProps & {
  render: (props: {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onFocus: React.FocusEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
    onMouseDown?: React.MouseEventHandler<HTMLInputElement>;
  }) => React.ReactElement;
};

const MaskedInput: FC<MaskedInputProps> = ({ render, ...props }) => {
  return <InputMask {...props}>{render}</InputMask>;
};

export default MaskedInput;
