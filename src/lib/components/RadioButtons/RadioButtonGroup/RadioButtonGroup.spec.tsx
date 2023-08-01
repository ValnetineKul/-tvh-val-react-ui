import React from 'react';
import { render, screen } from '../../../test-utils';
import RadioButton from '../RadioButton';
import RadioButtonGroup from './RadioButtonGroup';

describe('RadioButtonGroup', () => {
  it('Should render correctly', () => {
    const onChange = jest.fn();
    const { container } = render(
      <RadioButtonGroup value="value" onChange={onChange}>
        Children
      </RadioButtonGroup>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should show label', () => {
    const onChange = jest.fn();
    render(
      <RadioButtonGroup value="value" onChange={onChange} label="label">
        Children
      </RadioButtonGroup>
    );
    expect(screen.getByText('label')).toBeInTheDocument();
  });

  it('Should show label with *', () => {
    const onChange = jest.fn();
    render(
      <RadioButtonGroup value="value" onChange={onChange} label="label" required>
        Children
      </RadioButtonGroup>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('Should set "name" attribute in inputs with type="radio" to reference the value of the control', () => {
    render(
      <RadioButtonGroup value="value" onChange={() => null} name="radio-buttons">
        <RadioButton value="option" label="RadioButton option" />
      </RadioButtonGroup>
    );
    const radioButton = screen.getByRole('radio') as HTMLInputElement;
    expect(radioButton).toHaveAttribute('name', 'radio-buttons');
  });
});
