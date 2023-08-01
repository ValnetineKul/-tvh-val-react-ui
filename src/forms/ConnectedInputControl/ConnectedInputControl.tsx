import type React from 'react';
import type { FieldPathWithValue, FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import type { UseInputControlPayload, UseInputControlResult } from '../hooks';
import { useInputControl } from '../hooks';

export type ConnectedInputControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathWithValue<TFieldValues> = FieldPathWithValue<TFieldValues>
> = Omit<UseInputControlPayload<TFieldValues, TName>, 'control' | 'trigger'> & {
  render: (props: UseInputControlResult<TFieldValues, TName>) => React.ReactElement;
};

export function ConnectedInputControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathWithValue<TFieldValues> = FieldPathWithValue<TFieldValues>
>({ name, validate, render, disableDebounceValidation }: ConnectedInputControlProps<TFieldValues, TName>) {
  const { control, trigger } = useFormContext<TFieldValues>();

  const inputControlProps = useInputControl({
    trigger,
    control,
    name,
    validate,
    disableDebounceValidation,
  });

  return render(inputControlProps);
}
