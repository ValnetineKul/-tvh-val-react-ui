import React from 'react';
import { Pen, Times } from '../../Icon/icons/functional';
import { render, screen, userEvent } from '../../../test-utils';

import Chip from './Chip';
import Icon from '../../Icon';

describe('Chip', () => {
  it('Should render correctly', () => {
    const { container } = render(<Chip label="Label" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should be clickable', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Chip label="Label" onClick={handleClick} />);
    const el = getByRole('button', { name: 'Label' });
    userEvent.click(el);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Should have startIcon', () => {
    render(<Chip label="Label" startIcon={<Icon icon={Pen} />} />);
    const el = screen.getByText('pen.svg');
    expect(el).toBeInTheDocument();
  });

  it('Should have clickable endIcon', () => {
    const handleClick = jest.fn();
    const handleEndIconClick = jest.fn();
    render(
      <Chip label="Label" endIcon={<Icon icon={Times} />} onClick={handleClick} onEndIconClick={handleEndIconClick} />
    );
    const el = screen.getByRole('button', { name: '' });
    userEvent.click(el);
    expect(el).toBeInTheDocument();
    expect(handleClick).toHaveBeenCalledTimes(0);
    expect(handleEndIconClick).toHaveBeenCalledTimes(1);
  });

  it('Should be disabled', () => {
    render(
      <Chip label="Label" disabled endIcon={<Icon icon={Times} />} onClick={jest.fn()} onEndIconClick={jest.fn()} />
    );
    const el = screen.getByRole('button', { name: 'Label' });
    const endIcon = screen.getByRole('button', { name: '' });
    expect(el).toBeDisabled();
    expect(endIcon).toBeDisabled();
  });

  it('Should trigger only endIcon when click on endIcon', () => {
    const handleClick = jest.fn();
    const handleEndIconClick = jest.fn();

    render(
      <Chip label="Label" endIcon={<Icon icon={Times} />} onClick={handleClick} onEndIconClick={handleEndIconClick} />
    );
    const endIcon = screen.getByRole('button', { name: '' });
    userEvent.click(endIcon);

    expect(handleClick).toHaveBeenCalledTimes(0);
    expect(handleEndIconClick).toHaveBeenCalledTimes(1);
  });
});
