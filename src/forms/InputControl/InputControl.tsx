import type React from 'react';
import type { FieldPathWithValue, FieldValues } from 'react-hook-form';
import type { UseInputControlPayload, UseInputControlResult } from '../hooks';
import { useInputControl } from '../hooks';

export type InputControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathWithValue<TFieldValues> = FieldPathWithValue<TFieldValues>
> = UseInputControlPayload<TFieldValues, TName> & {
  render: (props: UseInputControlResult<TFieldValues, TName>) => React.ReactElement;
};

export default function InputControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathWithValue<TFieldValues> = FieldPathWithValue<TFieldValues>
>({ control, name, validate, render, trigger, disableDebounceValidation }: InputControlProps<TFieldValues, TName>) {
  const inputControlProps = useInputControl({
    control,
    name,
    validate,
    trigger,
    disableDebounceValidation,
  });

  return render(inputControlProps);
}
