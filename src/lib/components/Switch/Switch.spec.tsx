import React from 'react';
import { render, userEvent } from '../../test-utils';
import type { SwitchProps } from './Switch';
import Switch from './Switch';

const setup = (props?: Partial<SwitchProps>) => {
  return render(<Switch onChange={() => null} {...props} />);
};

describe('Switch', () => {
  it('Should render correctly', () => {
    const { container } = setup({ label: 'Switch label' });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should disable switch if disabled prop is true', () => {
    const { getByRole } = setup({ disabled: true });
    const switchComponenent = getByRole('checkbox') as HTMLInputElement;
    expect(switchComponenent).toBeDisabled();
  });

  it('Should have switch checked if checked prop is true', () => {
    const { getByRole } = setup({ checked: true });
    const switchComponenent = getByRole('checkbox') as HTMLInputElement;
    expect(switchComponenent).toBeChecked();
  });

  it('Should trigger onChange', () => {
    const onChange = jest.fn();
    const { getByRole } = setup({ onChange });
    const switchComponenent = getByRole('checkbox') as HTMLInputElement;
    userEvent.click(switchComponenent);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should trigger onChange on Enter', () => {
    const onChange = jest.fn();
    const { getByRole } = setup({ onChange });
    const switchComponenent = getByRole('checkbox') as HTMLInputElement;
    switchComponenent.focus();
    userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should show text label', () => {
    const { getByLabelText } = setup({ label: 'Switch label' });
    expect(getByLabelText('Switch label', { selector: 'input' })).toBeInTheDocument();
  });

  it('Should show custom component label', () => {
    const { getByLabelText } = setup({ label: <span>Custom label</span> });
    expect(getByLabelText('Custom label', { selector: 'input' })).toBeInTheDocument();
  });

  it('Should set "value" attribute', () => {
    const { getByRole } = setup({ value: 'Switch value' });
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toHaveAttribute('value', 'Switch value');
  });

  it('Should set name attribute', () => {
    const { getByRole } = setup({ name: 'switch-name' });
    const checkbox = getByRole('checkbox') as HTMLInputElement;
    expect(checkbox).toHaveAttribute('name', 'switch-name');
  });
});
