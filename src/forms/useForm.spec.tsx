import React from 'react';
import TextField from '@mui/material/TextField';
import { render, fireEvent, act } from '@testing-library/react';
import { FormProvider } from 'react-hook-form';
import { useForm } from './useForm';
import { ConnectedInputControl } from './ConnectedInputControl';

const Form: React.FC<{ onSubmit: (value: string) => void }> = ({ onSubmit }) => {
  const form = useForm({
    defaultValues: {
      field: '',
    },
  });
  const { register, handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(({ field }) => onSubmit(field))}>
        <TextField {...register('field')} />
        <ConnectedInputControl<Record<string, boolean>>
          name="test"
          render={({ onChange, value }) => <input type="checkbox" id="test" onChange={onChange} checked={value} />}
        />
      </form>
    </FormProvider>
  );
};

describe('useForm', () => {
  it('adjusts react-hook-form to material-ui', async () => {
    const onSubmit = jest.fn();
    const { container, getByRole } = render(<Form onSubmit={onSubmit} />);

    const input = getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'value' } });
    });

    const form = container.querySelector('form');
    await act(async () => {
      fireEvent.submit(form as Element);
    });

    expect(onSubmit).toHaveBeenCalledWith('value');
  });
});
