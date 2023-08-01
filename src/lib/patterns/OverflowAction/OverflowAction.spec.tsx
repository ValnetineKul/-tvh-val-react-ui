import type { ComponentProps } from 'react';
import React from 'react';
import { render, screen, userEvent, initResponsiveTest } from '../../test-utils';
import MenuItem from '../../components/Menus/MenuItem';
import OverflowAction from './OverflowAction';

type Props = ComponentProps<typeof OverflowAction>;

const props: Props = {
  menuItems: [<MenuItem label="item_1" onClick={jest.fn()} />],
  position: 'bottom-end',
};

describe('OverflowAction', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('Should open/close when clicked on anchor', () => {
    render(<OverflowAction {...props} />);

    expect(screen.queryByRole('button', { name: 'item_1' })).toBeNull();

    const anchor = screen.getByRole('button');

    userEvent.click(anchor);

    expect(screen.getByRole('button', { name: 'item_1' })).toBeInTheDocument();

    userEvent.click(anchor);

    expect(screen.queryByRole('button', { name: 'item_1' })).toBeNull();
  });

  it('Should close when clicked outside', () => {
    initResponsiveTest('Desktop');
    render(<OverflowAction {...props} />);

    const anchor = screen.getByRole('button');

    userEvent.click(anchor);
    jest.advanceTimersByTime(10);
    userEvent.click(document.body);

    expect(screen.queryByRole('button', { name: 'item_1' })).toBeNull();
  });
});
