import React from 'react';
import { render, screen, userEvent } from '../../test-utils';
import FloatingBar from './FloatingBar';

const props = {
  label: <div>Label</div>,
  actions: <div>Action Buttons</div>,
};

describe('FloatingBar', () => {
  it('Should render correctly', () => {
    const { container } = render(<FloatingBar {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should render clear selection', () => {
    const handleClearSelection = jest.fn();
    render(<FloatingBar {...props} onClearSelection={handleClearSelection} />);

    const clearButton = screen.getByText('Deselect all');
    userEvent.click(clearButton);

    expect(handleClearSelection).toHaveBeenCalled();
  });
});
