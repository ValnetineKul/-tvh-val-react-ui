import React from 'react';
import { render, userEvent } from '../../test-utils';
import TextArea from './TextArea';

describe('TextArea', () => {
  it('Should render correctly', () => {
    const { container } = render(<TextArea label="label" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should show characters count', () => {
    const { getByText } = render(<TextArea label="label" value="value" maxLength={100} characterCount />);
    expect(getByText('5/100')).toBeInTheDocument();
  });

  it('Should update characters count on value change', () => {
    const { getByText, rerender } = render(<TextArea label="label" value="value" maxLength={100} characterCount />);
    rerender(<TextArea label="label" value="new value" maxLength={100} characterCount />);
    expect(getByText('9/100')).toBeInTheDocument();
  });

  it('Should show error message', () => {
    const { container, getByText } = render(<TextArea label="label" errorMessage="Error message" />);
    expect(getByText('Error message')).toBeInTheDocument();
    expect(container.querySelector('.MuiInputBase-root')?.className).toMatch('Mui-error');
  });

  it('Should trigger onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<TextArea label="label" value="value" onChange={onChange} />);
    const textarea = getByLabelText('label', { selector: 'textarea', exact: false });
    userEvent.type(textarea, 'new value');
    expect(onChange).toHaveBeenCalledTimes(9);
  });
});
