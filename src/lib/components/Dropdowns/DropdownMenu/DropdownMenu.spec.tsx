import React from 'react';
import { render, screen, userEvent, act, initResponsiveTest } from '../../../test-utils';

import DropdownMenu from './DropdownMenu';
import MenuItem from '../../Menus/MenuItem';

const props = {
  isOpen: true,
  menuItems: [<MenuItem label="item_1" onClick={jest.fn()} />, <MenuItem label="item_2" onClick={jest.fn()} />],
  onClose: jest.fn(),
};

describe('DropdownMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('Should render menu items', () => {
    initResponsiveTest('Desktop');
    render(<DropdownMenu {...props} anchor={document.body} />);
    const dropdown = screen.getByRole('menu');
    expect(dropdown).toMatchSnapshot();
  });

  it('Should render sub menu', () => {
    render(
      <DropdownMenu
        {...props}
        anchor={document.body}
        menuItems={[
          ...props.menuItems,
          <MenuItem
            label="item_3"
            onClick={jest.fn()}
            subMenu={[<MenuItem label="sub_menu_1" onClick={jest.fn()} />]}
          />,
        ]}
      />
    );
    const subMenu = screen.getByText('item_3');
    act(() => {
      userEvent.click(subMenu);
    });
    expect(screen.getByText('sub_menu_1')).toBeInTheDocument();
  });

  it('Should call onClose when click outside', () => {
    initResponsiveTest('Desktop');
    const onClose = jest.fn();
    const anchor = document.createElement('div');
    render(<DropdownMenu {...props} onClose={onClose} anchor={anchor} />);
    jest.advanceTimersByTime(0);
    userEvent.click(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Should render Spinner if it is a loading state', () => {
    render(<DropdownMenu {...props} anchor={document.body} isLoading />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('Should render Spinner if no menu items exist and it is a loading state', () => {
    render(<DropdownMenu {...props} anchor={document.body} isLoading menuItems={[]} />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it("Should not render Spinner when it isn't a loading state", () => {
    render(<DropdownMenu {...props} anchor={document.body} isLoading={false} />);
    const spinner = screen.queryByRole('progressbar');
    expect(spinner).not.toBeInTheDocument();
  });

  it("Should not render Spinner when no menu items exist and when it isn't a loading state", () => {
    render(<DropdownMenu {...props} anchor={document.body} isLoading={false} menuItems={[]} />);
    const spinner = screen.queryByRole('progressbar');
    expect(spinner).not.toBeInTheDocument();
  });

  it('Should disable sub menu', () => {
    render(
      <DropdownMenu
        {...props}
        anchor={document.body}
        menuItems={[
          ...props.menuItems,
          <MenuItem
            label="subMenu_item"
            onClick={jest.fn()}
            disabled
            subMenu={[<MenuItem label="sub_item_1" onClick={jest.fn()} />]}
          />,
        ]}
      />
    );

    expect(screen.getByText('subMenu_item').closest('button')).toBeDisabled();
  });

  describe('Should set correct component to display menu items', () => {
    it('Should show modal on mobile', () => {
      initResponsiveTest('Mobile');

      render(<DropdownMenu {...props} anchor={document.body} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('Should show modal with sub menu on mobile', () => {
      initResponsiveTest('Mobile');

      render(
        <DropdownMenu
          {...props}
          anchor={document.body}
          menuItems={[
            ...props.menuItems,
            <MenuItem
              label="item_3"
              onClick={jest.fn()}
              subMenu={[<MenuItem label="sub_menu_1" onClick={jest.fn()} />]}
            />,
          ]}
        />
      );
      const subMenu = screen.getByText('item_3');
      userEvent.click(subMenu);
      expect(screen.getByText('sub_menu_1')).toBeInTheDocument();
    });

    it('Should show tooltip on tablet', () => {
      initResponsiveTest('Tablet');

      render(<DropdownMenu {...props} anchor={document.body} />);
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('Should show tooltip on desktop', () => {
      initResponsiveTest('Desktop');

      render(<DropdownMenu {...props} anchor={document.body} />);
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
