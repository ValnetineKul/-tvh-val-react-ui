import React from 'react';
import { render, userEvent } from '../../test-utils';
import TextField from './TextField';

describe('TextField', () => {
  it('Should render correctly', () => {
    const { container } = render(<TextField />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should show label', () => {
    const { getByText } = render(<TextField label="label" />);
    expect(getByText('label')).toBeInTheDocument();
  });

  it('Should show label with *', () => {
    const { getByText } = render(<TextField label="label" required />);
    expect(getByText('*')).toBeInTheDocument();
  });

  it('Should show icons', () => {
    const { getByText } = render(<TextField startIcon={<div>Start Icon</div>} endIcon={<div>End Icon</div>} />);
    expect(getByText('Start Icon')).toBeInTheDocument();
    expect(getByText('End Icon')).toBeInTheDocument();
  });

  it('Should show prefix and suffix', () => {
    const { getByText } = render(<TextField prefix="€" suffix="kg" />);
    expect(getByText('€')).toBeInTheDocument();
    expect(getByText('kg')).toBeInTheDocument();
  });

  it('Should show icon and prefix', () => {
    const { getByText } = render(<TextField prefix="€" startIcon={<div>Start Icon</div>} />);
    expect(getByText('Start Icon')).toBeInTheDocument();
    expect(getByText('€')).toBeInTheDocument();
  });

  it('Should show predefined value', () => {
    const { getByLabelText } = render(<TextField label="label" value="value" />);
    const input = getByLabelText('label', { selector: 'input', exact: false });
    expect(input).toHaveValue('value');
  });

  it('Should show characters count', () => {
    const { getByText } = render(<TextField value="value" maxLength={100} characterCount />);
    expect(getByText('5/100')).toBeInTheDocument();
  });

  it("Should highlight characters count if there's an error", () => {
    const { getByText } = render(
      <TextField value="value" maxLength={100} characterCount errorMessage="Error message" />
    );
    expect(getByText('5/100').parentElement?.className).toMatch('Mui-error');
  });

  it('Should update characters count on value change', () => {
    const { getByText, rerender } = render(<TextField value="value" maxLength={100} characterCount />);
    rerender(<TextField value="new value" maxLength={100} characterCount />);

    expect(getByText('9/100')).toBeInTheDocument();
  });

  it('Should show error message', () => {
    const { container, getByText } = render(<TextField errorMessage="Error message" />);
    expect(getByText('Error message')).toBeInTheDocument();
    expect(container.querySelector('.MuiInputBase-root')?.className).toMatch('Mui-error');
  });

  it('Should show help text', () => {
    const { getByText } = render(<TextField helpText="Help text" />);
    expect(getByText('Help text')).toBeInTheDocument();
  });

  it('Should trigger onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<TextField label="label" value="value" onChange={onChange} />);
    const input = getByLabelText('label', { selector: 'input', exact: false });
    userEvent.type(input, 'new value');
    expect(onChange).toHaveBeenCalledTimes(9);
  });

  it('Should trigger onFocus', () => {
    const onFocus = jest.fn();
    const { getByLabelText } = render(<TextField label="label" value="value" onFocus={onFocus} />);
    const input = getByLabelText('label', { selector: 'input', exact: false });
    userEvent.click(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('Should select input onFocus', () => {
    const { getByLabelText } = render(<TextField label="label" value="value" autoSelect />);
    const input = getByLabelText('label', { selector: 'input', exact: false }) as HTMLInputElement;
    expect(input.selectionStart).toBe(5);
    expect(input.selectionEnd).toBe(5);
    userEvent.click(input);
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(5);
  });

  describe('Should show label assigned to the input', () => {
    it('Should set label when label exists', () => {
      const { container, getByLabelText } = render(<TextField label="label" value="value" />);
      const input = getByLabelText('label', { selector: 'input', exact: false });
      const labelForAttribute = container.querySelector('label').getAttribute('for');

      expect(input).toHaveAttribute('id', 'label');
      expect(labelForAttribute).toEqual('label');
    });

    it('Should set id when id exists', () => {
      const { container, getByLabelText } = render(<TextField id="testId" label="label" value="value" />);
      const input = getByLabelText('label', { selector: 'input', exact: false });
      const labelForAttribute = container.querySelector('label').getAttribute('for');

      expect(input).toHaveAttribute('id', 'testId');
      expect(labelForAttribute).toEqual('testId');
    });
  });
});
