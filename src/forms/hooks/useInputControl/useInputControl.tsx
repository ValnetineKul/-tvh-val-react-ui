import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import type {
  Control,
  FieldPathValue,
  FieldPathWithValue,
  FieldValues,
  UseFormTrigger,
  FieldError,
  RegisterOptions,
  UnpackNestedValue,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import { debounce } from 'throttle-debounce';

export type UseInputControlPayload<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathWithValue<TFieldValues> = FieldPathWithValue<TFieldValues>
> = {
  control: Control<TFieldValues>;
  trigger: UseFormTrigger<TFieldValues>;
  name: TName;
} & Partial<{
  disableDebounceValidation: boolean;
  validate: RegisterOptions<TFieldValues, TName>['validate'];
}>;

export type UseInputControlResult<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathWithValue<TFieldValues> = FieldPathWithValue<TFieldValues>
> = {
  name: TName;
  onBlur: () => void;
  onChange: (...event: unknown[]) => void;
  value: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
  inputRef: React.Ref<HTMLInputElement>;
  error: FieldError | undefined;
  invalid: boolean;
};

export function useInputControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathWithValue<TFieldValues> = FieldPathWithValue<TFieldValues>
>({
  control,
  name,
  validate,
  trigger,
  disableDebounceValidation = false,
}: UseInputControlPayload<TFieldValues, TName>): UseInputControlResult<TFieldValues, TName> {
  const [isDebounceWasTriggered, setIsDebounceWasTriggered] = useState(false);

  const debounceValidate = useMemo(
    () =>
      debounce(3000, () => {
        trigger(name);
        setIsDebounceWasTriggered(true);
      }),
    [name, trigger]
  );

  const {
    field: { ref, ...inputProps },
    fieldState: { isDirty, error, invalid },
    formState: { isSubmitted },
  } = useController({ name, control, rules: { validate } });

  useEffect(() => {
    // don't do custom validation after first check
    if (isSubmitted || isDebounceWasTriggered || !isDirty || disableDebounceValidation) {
      return;
    }
    debounceValidate();
  }, [debounceValidate, inputProps.value, isDirty, isSubmitted, isDebounceWasTriggered, disableDebounceValidation]);

  useEffect(() => {
    return () => {
      debounceValidate.cancel();
    };
  }, [debounceValidate]);

  // validation on each value change
  useEffect(() => {
    if (!isSubmitted && isDebounceWasTriggered) {
      trigger(name);
    }
    if (isSubmitted) {
      debounceValidate.cancel();
      setIsDebounceWasTriggered(false);
    }
  }, [inputProps.value, isSubmitted, name, trigger, isDebounceWasTriggered, debounceValidate]);

  const handleBlur = () => {
    if (!isSubmitted) {
      setIsDebounceWasTriggered(true);
      trigger(name);
    }
  };

  return { ...inputProps, onBlur: handleBlur, inputRef: ref, error, invalid };
}
