import type { UseFormProps, UseFormRegisterReturn, UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';

// https://github.com/react-hook-form/react-hook-form/issues/4629#issuecomment-814279961
function useMaterialForm<T>(options: UseFormProps<T>): UseFormReturn<T> {
  const { register, ...rest } = useForm(options);

  return {
    register: (...args) => {
      const { ref, ...restRegister } = register(...args);
      return { inputRef: ref, ...restRegister } as Omit<UseFormRegisterReturn, 'ref'>;
    },
    ...rest,
  } as UseFormReturn<T>;
}

export { useMaterialForm as useForm };
