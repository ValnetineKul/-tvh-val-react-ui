import { fireEvent, render, screen, act } from '@testing-library/react';
import React from 'react';
import * as z from 'zod';
import InputControl from './InputControl';
import { useForm } from '../useForm';
import { useValidators } from '../useValidators';

interface Props {
  value: string;
  disableDebounceValidation?: boolean;
}

const TestComponent: React.FC<Props> = ({ value, disableDebounceValidation }) => {
  interface FormValues {
    exampleField: string;
  }
  const { createResolver } = useValidators();

  const validationSchema = z.object({
    exampleField: z.string().nonempty(),
  });

  const {
    control,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      exampleField: value,
    },
    resolver: createResolver(validationSchema),
  });

  return (
    <div>
      <InputControl
        control={control}
        name="exampleField"
        trigger={trigger}
        disableDebounceValidation={disableDebounceValidation}
        render={({ inputRef, invalid, ...inputProps }) => <input {...inputProps} ref={inputRef} />}
      />
      <span role="alert">{errors.exampleField?.message}</span>
    </div>
  );
};
describe('InputControl', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('Should render correctly', () => {
    const { container } = render(<TestComponent value="" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should show predefined value', () => {
    render(<TestComponent value="test" />);
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toEqual('test');
  });

  it('Should validate on blur', async () => {
    render(<TestComponent value="" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const error = screen.getByRole('alert');
    await act(async () => {
      fireEvent.focus(input);
    });
    expect(error.textContent).toEqual('');
    await act(async () => {
      fireEvent.blur(input);
    });
    expect(error.textContent).toEqual("This field can't be empty");

    // now validation works on every input value change
    await act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    expect(error.textContent).toEqual('');
  });

  it.each([
    ['validate after 3 seconds', false, "This field can't be empty"],
    ['not validate after 3 seconds if debounced validation is disabled', true, ''],
  ])('Should %p', async (testDescription: string, disableDebounceValidation: boolean, expectedError: string) => {
    render(<TestComponent value="test" disableDebounceValidation={disableDebounceValidation} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const error = screen.getByRole('alert');
    await act(async () => {
      fireEvent.focus(input);
    });
    await act(async () => {
      fireEvent.change(input, { target: { value: '' } });
    });
    expect(error.textContent).toEqual('');

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    expect(error.textContent).toEqual(expectedError);

    // now validation works on every input value change
    await act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    expect(error.textContent).toEqual('');
  });
});
