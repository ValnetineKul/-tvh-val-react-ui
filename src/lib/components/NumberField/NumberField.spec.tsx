import React from 'react';
import { createEvent, fireEvent } from '@testing-library/react';
import { render, userEvent } from '../../test-utils';
import NumberField from './NumberField';

const pasteNumberFromClipboard = (inputElement: HTMLElement, clipboardNumber: string) => {
  const pasteEvent = createEvent.paste(inputElement, {
    clipboardData: {
      getData: () => clipboardNumber,
    },
  });

  fireEvent(inputElement, pasteEvent);

  return pasteEvent;
};

describe('NumberField', () => {
  it('Should render correctly', () => {
    const { container } = render(<NumberField />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Should be empty by default', () => {
    const { getByLabelText } = render(<NumberField label="Quantity" />);
    const input = getByLabelText('Quantity', { selector: 'input', exact: false });
    expect(input).toHaveValue('');
  });

  describe('Should have formatted value', () => {
    const cases = [
      [1, '1'],
      [1000, '1,000'],
      [10000, '10,000'],
      [100000, '100,000'],
      [1000000, '1,000,000'],
      [10000000, '10,000,000'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (value: React.ComponentProps<typeof NumberField>['value'], expected: string) => {
        const { getByLabelText } = render(<NumberField label="Quantity" value={value} />);
        const input = getByLabelText('Quantity', { selector: 'input', exact: false });
        expect(input).toHaveValue(expected);
      }
    );
  });
  describe('Should have formatted float value', () => {
    const cases = [
      [1, '1.00'],
      [1000, '1,000.00'],
      [10000, '10,000.00'],
      [100000, '100,000.00'],
      [1000000, '1,000,000.00'],
      [10000000, '10,000,000.00'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (value: React.ComponentProps<typeof NumberField>['value'], expected: string) => {
        const { getByLabelText } = render(<NumberField label="Quantity" value={value} decimalScale={2} />);
        const input = getByLabelText('Quantity', { selector: 'input', exact: false });
        expect(input).toHaveValue(expected);
      }
    );
  });
  it('Should trigger onChange', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<NumberField label="Quantity" onChange={handleChange} />);
    const input = getByLabelText('Quantity', { selector: 'input', exact: false });
    userEvent.type(input, '42');
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(input).toHaveValue('42');
  });
  it('Should show error message', () => {
    const { getByText } = render(<NumberField errorMessage="Error message example" />);
    const errorMessage = getByText(/Error message example/);
    expect(errorMessage).toBeInTheDocument();
  });
  it('Should render value with decimals', () => {
    const { getByLabelText, rerender } = render(<NumberField label="Quantity" value={1000} decimalScale={2} />);
    const input = getByLabelText('Quantity', { selector: 'input', exact: false });
    expect(input).toHaveValue('1,000.00');

    rerender(<NumberField label="Rerender" value={1000} decimalScale={5} />);
    const rerenderInput = getByLabelText('Rerender', { selector: 'input', exact: false });
    expect(rerenderInput).toHaveValue('1,000.00000');
  });
  it('Should not show decimalSeparator', () => {
    const { getByLabelText } = render(<NumberField label="Quantity" value={1000} decimalScale={0} />);
    const input = getByLabelText('Quantity', { selector: 'input', exact: false });
    expect(input).toHaveValue('1,000');
  });
  it('Should change cursor position if decimalSeparator was added before existing separator', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <NumberField label="Quantity" value={1000} decimalScale={2} onChange={handleChange} />
    );
    const input = getByLabelText('Quantity', { selector: 'input', exact: false }) as HTMLInputElement;
    input.setSelectionRange(5, 5);
    userEvent.type(input, '.');
    expect(input.selectionStart).toBe(6);
    expect(handleChange).toHaveBeenCalledTimes(0);
  });
  it('Should not change cursor position if decimalSeparator was added not before existing separator', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <NumberField label="Quantity" value={1000} decimalScale={2} onChange={handleChange} />
    );
    const input = getByLabelText('Quantity', { selector: 'input', exact: false }) as HTMLInputElement;
    input.setSelectionRange(4, 4);
    userEvent.type(input, '.');
    expect(input.selectionStart).toBe(4);
    expect(handleChange).toHaveBeenCalledTimes(0);
  });
  it('Should trigger change on ArrowUp event', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<NumberField label="Quantity" value={1} onChange={handleChange} />);
    const input = getByLabelText('Quantity', { selector: 'input', exact: false });
    userEvent.type(input, '{arrowup}');
    expect(handleChange).toHaveBeenCalledWith(2);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  it('Should trigger change on ArrowDown event', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<NumberField label="Quantity" value={1} onChange={handleChange} />);
    const input = getByLabelText('Quantity', { selector: 'input', exact: false });
    userEvent.type(input, '{arrowdown}');
    expect(handleChange).toHaveBeenCalledWith(0);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
  it('Should do nothing on minus event', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<NumberField label="Quantity" value={1} onChange={handleChange} />);
    const input = getByLabelText('Quantity', { selector: 'input', exact: false });
    userEvent.type(input, '{minus}');
    expect(handleChange).toHaveBeenCalledTimes(0);
  });
  it('Should not allow non-numeric symbols', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<NumberField label="Quantity" value={1} onChange={handleChange} />);
    const input = getByLabelText('Quantity', { selector: 'input', exact: false });
    userEvent.type(input, 'a');
    userEvent.type(input, '-');
    userEvent.type(input, '.');
    expect(handleChange).not.toHaveBeenCalled();
  });
  it('Should not exceed 15 digits', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<NumberField label="Quantity" value={123456789012345} onChange={handleChange} />);
    const input = getByLabelText('Quantity', { selector: 'input', exact: false });
    userEvent.type(input, '6');
    expect(handleChange).toHaveBeenCalledTimes(0);
    expect(input).toHaveValue('123,456,789,012,345');
  });

  describe('Should not allow to use negative digits', () => {
    it('Should show error message when negative digits are pasted from clipboard', () => {
      const { getByLabelText, getByText } = render(<NumberField label="Quantity" />);
      const input = getByLabelText('Quantity', { selector: 'input', exact: false });

      pasteNumberFromClipboard(input, '-5');
      expect(getByText('Negative numbers cannot be used')).toBeInTheDocument();
    });

    it('Should not change the existing value to negative when minus symbol is pasted', () => {
      const { getByLabelText } = render(<NumberField label="Quantity" value={3} />);
      const input = getByLabelText('Quantity', { selector: 'input', exact: false });

      const clipBoardEvent = pasteNumberFromClipboard(input, '-');
      expect(clipBoardEvent.defaultPrevented).toBeTruthy();
      expect(input).toHaveValue('3');
    });

    it('Should not change the existing value to negative when a string containing minus symbol is pasted', () => {
      const { getByLabelText } = render(<NumberField label="Quantity" value={3} />);
      const input = getByLabelText('Quantity', { selector: 'input', exact: false });

      const clipBoardEvent = pasteNumberFromClipboard(input, '+-+');
      expect(clipBoardEvent.defaultPrevented).toBeTruthy();
      expect(input).toHaveValue('3');
    });

    it('Should not allow to set negative digist when using arrowdown keyboard navigation', () => {
      const handleChange = jest.fn();
      const { getByLabelText } = render(<NumberField label="Quantity" value={0} onChange={handleChange} />);
      const input = getByLabelText('Quantity', { selector: 'input', exact: false });

      userEvent.type(input, '{arrowdown}');
      expect(handleChange).toHaveBeenCalledWith(0);
    });

    it('Should disable browser autocomplete for correct arrowUp and arrawDown keyboard navigation', () => {
      const { getByLabelText } = render(<NumberField label="Quantity" />);
      const input = getByLabelText('Quantity', { selector: 'input', exact: false });
      expect(input).toHaveAttribute('autocomplete', 'off');
    });
  });
});
