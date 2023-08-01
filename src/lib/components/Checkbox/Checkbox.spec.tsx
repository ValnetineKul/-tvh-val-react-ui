import React from 'react';
import { userEvent, render } from '../../test-utils';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('Should render correctly', () => {
    const { container } = render(<Checkbox label="Checkbox label" onChange={() => null} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should disable checkbox if disabled prop is true', () => {
    const { getByRole } = render(<Checkbox label="Checkbox label" onChange={() => null} disabled />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toBeDisabled();
  });

  it('Should have checkbox checked if checked prop is true', () => {
    const { getByRole } = render(<Checkbox label="Checkbox label" onChange={() => null} checked />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toBeChecked();
  });

  it('Should have checkbox indeterminate if indeterminate prop is true', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Checkbox label="Checkbox label" onChange={onChange} indeterminate />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toHaveAttribute('data-indeterminate', 'true');
  });

  it('Should trigger onChange', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Checkbox label="Checkbox label" onChange={onChange} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    userEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should show text label', () => {
    const { getByLabelText } = render(<Checkbox label="Checkbox label" onChange={() => null} />);
    expect(getByLabelText('Checkbox label', { selector: 'input' })).toBeInTheDocument();
  });

  it('Should show custom component label', () => {
    const { getByLabelText } = render(<Checkbox label={<span>Custom label</span>} onChange={() => null} />);
    expect(getByLabelText('Custom label', { selector: 'input' })).toBeInTheDocument();
  });

  it('Should set "value" attribute', () => {
    const { getByRole } = render(<Checkbox value="Checkbox value" onChange={() => null} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toHaveAttribute('value', 'Checkbox value');
  });

  it('Should set name attribute', () => {
    const { getByRole } = render(<Checkbox name="checkbox-name" onChange={() => null} />);
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toHaveAttribute('name', 'checkbox-name');
  });
});
