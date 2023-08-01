import React from 'react';
import { render, userEvent } from '../../../test-utils';
import EndAdornment from './EndAdornment';

const mockOnEndAdornmentClick = jest.fn();
const mockOnClear = jest.fn();

describe('EndAdornment', () => {
  it('Should render with end adornment', () => {
    const { getByLabelText } = render(
      <EndAdornment multiple withEndAdornment onEndAdornmentClick={mockOnEndAdornmentClick} />
    );

    const toggleButton = getByLabelText('Toggle select', { selector: 'button' });
    userEvent.click(toggleButton);
    expect(mockOnEndAdornmentClick).toBeCalled();
  });

  it('Should render with clear button', () => {
    const { getByLabelText } = render(<EndAdornment multiple shouldShowClearButton onClear={mockOnClear} />);

    const clearButton = getByLabelText('Clear value', { selector: 'button' });
    userEvent.click(clearButton);
    expect(mockOnClear).toBeCalled();
  });
});
