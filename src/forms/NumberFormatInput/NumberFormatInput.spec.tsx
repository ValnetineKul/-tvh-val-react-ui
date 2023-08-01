import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import NumberFormatInput from './NumberFormatInput';

describe('NumberFormatInput', () => {
  it('Should render correctly', () => {
    const { container } = render(<NumberFormatInput />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Should render value with thousandSeparator as "." ', () => {
    const { getByRole } = render(<NumberFormatInput value={1000} thousandSeparator="." decimalSeparator="," />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toEqual('1.000');
  });
  it('Should render value with decimal separator as ","', () => {
    const { getByRole } = render(
      <NumberFormatInput value={1000.45} thousandSeparator="." decimalSeparator="," decimalScale={2} />
    );
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toEqual('1.000,45');
  });
  it('Should trigger onChange', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<NumberFormatInput onChange={handleChange} />);
    const input = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '42' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('42');
  });
});
