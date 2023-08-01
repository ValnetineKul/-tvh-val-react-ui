import React from 'react';
import { userEvent, render } from '../../../test-utils';
import RadioButton from './RadioButton';

const props = {
  label: 'RadioButton label',
  value: 'RadioButton value',
};

describe('RadioButton', () => {
  it('Should render correctly', () => {
    const { container } = render(<RadioButton {...props} onChange={() => null} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should disable radio button if disabled prop is true', () => {
    const { getByRole } = render(<RadioButton {...props} onChange={() => null} disabled />);
    const radioButton = getByRole('radio') as HTMLInputElement;
    expect(radioButton).toBeDisabled();
  });

  it('Should have radio button checked if checked prop is true', () => {
    const { getByRole } = render(<RadioButton {...props} onChange={() => null} checked />);
    const radioButton = getByRole('radio') as HTMLInputElement;
    expect(radioButton).toBeChecked();
  });

  it('Should trigger onChange', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<RadioButton {...props} onChange={onChange} />);
    const radioButton = getByRole('radio') as HTMLInputElement;
    userEvent.click(radioButton);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should show text label', () => {
    const { getByLabelText } = render(<RadioButton {...props} onChange={() => null} />);
    expect(getByLabelText('RadioButton label', { selector: 'input' })).toBeInTheDocument();
  });

  it('Should not have label tag if label prop is empty', () => {
    const { queryByLabelText } = render(<RadioButton {...props} label="" onChange={() => null} />);
    expect(queryByLabelText('RadioButton label', { selector: 'input' })).not.toBeInTheDocument();
  });

  it('Should have "value" attribute if label prop is empty', () => {
    const { getByRole } = render(<RadioButton {...props} label="" onChange={() => null} />);
    const radioButton = getByRole('radio') as HTMLInputElement;
    expect(radioButton).toHaveAttribute('value', 'RadioButton value');
  });

  it('Should set name attribute', () => {
    const { getByRole } = render(<RadioButton {...props} name="radio-button" onChange={() => null} />);
    const radioButton = getByRole('radio') as HTMLInputElement;
    expect(radioButton).toHaveAttribute('name', 'radio-button');
  });
});
