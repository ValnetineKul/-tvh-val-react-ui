import React from 'react';
import { render, screen, userEvent, initResponsiveTest } from '../../../test-utils';

import DropdownList from './DropdownList';
import MenuItem from '../../Menus/MenuItem';
import Button from '../../Buttons/Button';

const props = {
  anchor: document.createElement('div'),
  isOpen: true,
  listItems: [<MenuItem label="item_1" onClick={jest.fn()} />, <MenuItem label="item_2" onClick={jest.fn()} />],
  onClose: jest.fn(),
  header: 'Dropdown header',
  actionItem: <div>Action</div>,
};

describe('DropdownList', () => {
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
    render(<DropdownList {...props} />);
    const dropdown = screen.getByRole('tooltip');
    expect(dropdown).toMatchSnapshot();
  });

  it('Should be virtualized', () => {
    initResponsiveTest('Desktop');
    const manyItems = Array.from(new Array(20)).map((_, index) => {
      return <MenuItem label="item" key={index} onClick={jest.fn()} />;
    });
    render(<DropdownList {...props} listItems={manyItems} />);
    const items = screen.getAllByText('item');
    expect(items).toHaveLength(12);
  });

  it('Should not be virtualized', () => {
    const manyItems = Array.from(new Array(20)).map((_, index) => {
      return <MenuItem label="item" key={index} onClick={jest.fn()} />;
    });
    render(<DropdownList {...props} listItems={manyItems} isVirtualized={false} />);
    const items = screen.getAllByText('item');
    expect(items).toHaveLength(20);
  });

  it('Should render inline message if no list items', () => {
    render(<DropdownList {...props} listItems={[]} inlineMessage="message" />);
    const inlineMessage = screen.getByText('message');
    expect(inlineMessage).toBeInTheDocument();
  });

  it('Should render error banner', () => {
    render(<DropdownList {...props} error={<div>Error message</div>} />);
    const error = screen.getByText('Error message');
    expect(error).toBeInTheDocument();
  });

  it('Should call onClose when click outside', () => {
    initResponsiveTest('Desktop');
    const onClose = jest.fn();
    render(<DropdownList {...props} onClose={onClose} />);
    jest.advanceTimersByTime(0);
    userEvent.click(document.body);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Should render Spinner when it is a loading state', () => {
    render(<DropdownList {...props} anchor={document.body} isLoading />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('Should have overwritten maxHeight style', () => {
    const { getByRole } = render(<DropdownList {...props} menuListClassName="someClassName" isVirtualized={false} />);
    expect((getByRole('menu') as HTMLElement).className).toMatch('someClassName');
  });

  it('Should render custom header', () => {
    const args = {
      ...props,
      header: <Button label="Custom header" />,
    };
    render(<DropdownList {...args} />);
    const header = screen.getByRole('button', { name: 'Custom header' });
    expect(header).toBeInTheDocument();
  });

  describe('Should set correct component to display menu items', () => {
    it('Should show modal on mobile', () => {
      initResponsiveTest('Mobile');

      render(<DropdownList {...props} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('Should show tooltip on tablet', () => {
      initResponsiveTest('Tablet');

      render(<DropdownList {...props} />);
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('Should show tooltip on desktop', () => {
      initResponsiveTest('Desktop');

      render(<DropdownList {...props} />);
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
