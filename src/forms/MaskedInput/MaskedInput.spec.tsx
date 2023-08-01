import { fireEvent, render } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import React from 'react';
import MaskedInput from './MaskedInput';

const Input = (props: Record<string, unknown>) => <input {...props} />;

describe('MaskedInput', () => {
  it('Should render correctly', () => {
    const { container } = render(<MaskedInput mask="999/999" render={Input} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should show predefined value', () => {
    const { getByRole } = render(<MaskedInput mask="999/999" value="123456" render={Input} />);
    expect((getByRole('textbox') as HTMLInputElement).value).toEqual('123/456');
  });

  it('Should trigger onChange', () => {
    let value = '';
    const onChange = jest.fn((e: ChangeEvent<HTMLInputElement>) => {
      value = e.target.value;
    });
    const { getByRole } = render(<MaskedInput mask="999/999" value="123/456" onChange={onChange} render={Input} />);
    const input = getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toEqual('___/___');
    fireEvent.change(input, { target: { value: '555666' } });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(value).toEqual('555/666');
  });
});
