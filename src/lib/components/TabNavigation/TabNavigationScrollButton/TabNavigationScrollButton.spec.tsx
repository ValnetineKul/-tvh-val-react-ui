import React from 'react';
import { render, screen, within } from '../../../test-utils';
import type { TabNavigationScrollButtonProps } from './TabNavigationScrollButton';
import TabNavigationScrollButton from './TabNavigationScrollButton';

describe('TabNavigationScrollButton', () => {
  it('Should render correctly', () => {
    const { container } = render(<TabNavigationScrollButton onClick={jest.fn()} direction="left" disabled={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Should render correct icon inside scroll button', () => {
    const cases = [
      ['left', 'angleLeft.svg'],
      ['right', 'angleRight.svg'],
    ];
    test.each(cases)('given %p, returns %p', (input: TabNavigationScrollButtonProps['direction'], expected: string) => {
      render(<TabNavigationScrollButton onClick={jest.fn()} direction={input} disabled={false} />);
      const scrollButton = screen.getByRole('button');
      expect(within(scrollButton).getByText(expected, { selector: 'svg' })).toBeInTheDocument();
    });
  });

  it('Should trigger onClick', () => {
    const handleClick = jest.fn();
    render(<TabNavigationScrollButton onClick={handleClick} direction="left" disabled={false} />);
    const scrollButton = screen.getByRole('button');
    scrollButton.click();
    expect(handleClick).toHaveBeenCalled();
  });

  it('Should disable button if disabled prop is true', () => {
    render(<TabNavigationScrollButton onClick={jest.fn()} direction="left" disabled />);
    const scrollButton = screen.getByRole('button');
    scrollButton.click();
    expect(scrollButton).toBeDisabled();
  });
});
