import React from 'react';
import { initResponsiveTest, render, screen, userEvent } from '../../test-utils';
import type { RenderAction } from './ActionsGroup';
import ActionsGroup from './ActionsGroup';

interface Params {
  buttonsCount?: number;
  iconButtonsCount?: number;
  visibleAmount?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  className?: string;
}

const getProps = (params?: Params) => {
  const { buttonsCount = 2, iconButtonsCount = 1, visibleAmount, className } = params || {};

  const buttons: RenderAction[] = [];
  const iconButtons: RenderAction[] = [];

  for (let i = 0; i < buttonsCount; i++) {
    buttons.push(({ isFullWidth, isSquashed }) =>
      isSquashed ? (
        <li key={`item-${i}`}>{`MenuItem ${i + 1}`}</li>
      ) : (
        <button className={isFullWidth ? 'full' : ''} type="button">
          {`Button ${i + 1}`}
        </button>
      )
    );
  }
  for (let i = 0; i < iconButtonsCount; i++) {
    iconButtons.push(({ isSquashed }) =>
      isSquashed ? (
        <li key={`icon-item-${i}`}>{`IconMenuItem ${i + 1}`}</li>
      ) : (
        <button type="button">{`IconButton ${i + 1}`}</button>
      )
    );
  }

  return {
    buttons,
    className,
    iconButtons,
    visibleAmount,
  };
};

describe('ActionsGroup', () => {
  it('Should render correctly on the Mobile', () => {
    initResponsiveTest('Mobile');
    const props = getProps();
    const { container } = render(<ActionsGroup {...props} />);
    expect(container.firstChild).toMatchSnapshot('ActionsGroup mobile');
  });
  it('Should render correctly on the Tablet', () => {
    initResponsiveTest('Tablet');
    const props = getProps();
    const { container } = render(<ActionsGroup {...props} />);
    expect(container.firstChild).toMatchSnapshot('ActionsGroup tablet');
  });
  it('Should render correctly on the Desktop', () => {
    initResponsiveTest('Desktop');
    const props = getProps();
    const { container } = render(<ActionsGroup {...props} />);
    expect(container.firstChild).toMatchSnapshot('ActionsGroup desktop');
  });

  it('Should use correct className', () => {
    const props = getProps({ className: 'custom-class' });
    const { container } = render(<ActionsGroup {...props} />);

    expect(container.firstChild).toHaveClass(props.className as string);
  });

  it('Buttons should be fullWidth on mobile and the last one should be flexible', () => {
    const props = getProps();
    initResponsiveTest('Mobile');
    render(<ActionsGroup {...props} />);
    const button1 = screen.getByText('Button 1', { selector: 'button' });
    const button2 = screen.getByText('Button 2', { selector: 'button' });
    const iconButton = screen.getByText('IconButton 1', { selector: 'button' });

    expect(button1).toHaveClass('full');
    expect(button2).toHaveClass('full');
    expect(button1.parentElement?.className).not.toMatch(/lastButtonWrapperMobile/);
    expect(button2.parentElement?.className).toMatch(/lastButtonWrapperMobile/);
    expect(iconButton).not.toHaveClass('full');
  });

  it('Should render actions in the direct order on the mobile', () => {
    const props = getProps();
    initResponsiveTest('Mobile');
    const { firstChild } = render(<ActionsGroup {...props} />).container;
    const button1 = screen.getByText('Button 1', { selector: 'button' });
    const button2 = screen.getByText('Button 2', { selector: 'button' });
    const iconButton = screen.getByText('IconButton 1', { selector: 'button' });

    expect(firstChild?.childNodes[0]).toContainElement(button1);
    expect(firstChild?.childNodes[1]).toContainElement(button2);
    expect(firstChild?.childNodes[2]).toContainElement(iconButton);
  });

  it('Should render actions in the direct order on the tablet', () => {
    const props = getProps();
    initResponsiveTest('Tablet');
    const { firstChild } = render(<ActionsGroup {...props} />).container;
    const button1 = screen.getByText('Button 1', { selector: 'button' });
    const button2 = screen.getByText('Button 2', { selector: 'button' });
    const iconButton = screen.getByText('IconButton 1', { selector: 'button' });

    expect(firstChild?.childNodes[0]).toContainElement(button1);
    expect(firstChild?.childNodes[1]).toContainElement(button2);
    expect(firstChild?.childNodes[2]).toContainElement(iconButton);
  });

  it('Should render actions in the reversed order on the desktop', () => {
    const props = getProps({ buttonsCount: 3 });
    initResponsiveTest('Desktop');
    const { firstChild, firstElementChild } = render(<ActionsGroup {...props} />).container;
    const button1 = screen.getByText('Button 1', { selector: 'button' });
    const button2 = screen.getByText('Button 2', { selector: 'button' });
    const button3 = screen.getByText('Button 3', { selector: 'button' });
    const iconButton = screen.getByText('IconButton 1', { selector: 'button' });

    expect(firstChild?.childNodes[0]).toContainElement(button1);
    expect(firstChild?.childNodes[1]).toContainElement(button2);
    expect(firstChild?.childNodes[2]).toContainElement(button3);
    expect(firstChild?.childNodes[3]).toContainElement(iconButton);
    expect(firstElementChild?.className).toMatch(/reversedList/);
  });

  it('Should render overflow with the correct ordering if the actions amount is more than visibleAmount on mobile', () => {
    const props = getProps({ buttonsCount: 2, visibleAmount: 2 });
    initResponsiveTest('Mobile');
    render(<ActionsGroup {...props} />);

    expect(screen.getByText('Button 1', { selector: 'button' })).toBeInTheDocument();
    expect(screen.queryByText('Button 2', { selector: 'button' })).not.toBeInTheDocument();
    expect(screen.queryByText('IconButton 1', { selector: 'button' })).not.toBeInTheDocument();

    const overflowButton = screen.getByText('ellipsisH.svg', { selector: 'svg' });
    expect(overflowButton).toBeInTheDocument();
    userEvent.click(overflowButton);

    const menuItem2 = screen.getByText('MenuItem 2', { selector: 'li' });
    const dropDown = menuItem2.parentElement;
    const iconButton = screen.getByText('IconMenuItem 1', { selector: 'li' });

    expect(dropDown?.childNodes[0]).toContainElement(menuItem2);
    expect(dropDown?.childNodes[1]).toContainElement(iconButton);
  });

  it('Should render overflow with the correct ordering if the actions amount is more than visibleAmount on tablet', () => {
    const props = getProps({ buttonsCount: 2, visibleAmount: 2 });
    initResponsiveTest('Tablet');
    render(<ActionsGroup {...props} />);

    expect(screen.getByText('Button 1', { selector: 'button' })).toBeInTheDocument();
    expect(screen.queryByText('Button 2', { selector: 'button' })).not.toBeInTheDocument();
    expect(screen.queryByText('IconButton 1', { selector: 'button' })).not.toBeInTheDocument();

    const overflowButton = screen.getByText('ellipsisH.svg', { selector: 'svg' });
    expect(overflowButton).toBeInTheDocument();
    userEvent.click(overflowButton);

    const menuItem2 = screen.getByText('MenuItem 2', { selector: 'li' });
    const dropDown = menuItem2.parentElement;
    const iconButton = screen.getByText('IconMenuItem 1', { selector: 'li' });

    expect(dropDown?.childNodes[0]).toContainElement(menuItem2);
    expect(dropDown?.childNodes[1]).toContainElement(iconButton);
  });

  it('Should render overflow with the correct ordering if the actions amount is more than visibleAmount on desktop', () => {
    const props = getProps({ buttonsCount: 3, visibleAmount: 2 });
    initResponsiveTest('Desktop');
    render(<ActionsGroup {...props} />);

    expect(screen.getByText('Button 1', { selector: 'button' })).toBeInTheDocument();
    expect(screen.getByText('Button 2', { selector: 'button' })).toBeInTheDocument();
    expect(screen.queryByText('Button 3', { selector: 'button' })).not.toBeInTheDocument();
    expect(screen.queryByText('IconButton 1', { selector: 'button' })).not.toBeInTheDocument();

    const overflowButton = screen.getByText('ellipsisH.svg', { selector: 'svg' });
    expect(overflowButton).toBeInTheDocument();
    userEvent.click(overflowButton);

    const menuItem3 = screen.getByText('MenuItem 3', { selector: 'li' });
    const dropDown = menuItem3.parentElement;
    const iconButton = screen.getByText('IconMenuItem 1', { selector: 'li' });

    expect(dropDown?.childNodes[0]).toContainElement(menuItem3);
    expect(dropDown?.childNodes[1]).toContainElement(iconButton);
  });
});
