import React from 'react';
import { render, userEvent } from '../../test-utils';
import PhoneField from './PhoneField';

describe('PhoneField', () => {
  it('Should render correctly', () => {
    const handleChange = jest.fn();
    const { container } = render(<PhoneField onChange={handleChange} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Should contain default country code by default', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<PhoneField label="Phone" onChange={handleChange} />);
    const input = getByLabelText('Phone', { selector: 'input', exact: false });
    expect(input).toHaveValue('+32');
  });
  it('Should trigger onChange', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<PhoneField label="Phone" onChange={handleChange} />);
    const input = getByLabelText('Phone', { selector: 'input', exact: false });
    userEvent.type(input, '4');
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('+32 4');
  });

  it('Should show error message', () => {
    const handleChange = jest.fn();
    const { getByText } = render(<PhoneField onChange={handleChange} errorMessage="Error message example" />);
    const errorMessage = getByText(/Error message example/);
    expect(errorMessage).toBeInTheDocument();
  });
});
