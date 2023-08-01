import React from 'react';
import { Plus } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import { userEvent, render, screen } from '../../../test-utils';
import IconButton from './IconButton';

describe('IconButton', () => {
  it('Should render correctly', () => {
    const { container } = render(<IconButton onClick={jest.fn()} icon={<Icon icon={Plus} />} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Should set icon size', () => {
    const cases = [
      [undefined, 'Icon-sizeMd'],
      ['sm', 'Icon-sizeSm'],
      ['md', 'Icon-sizeMd'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof IconButton>['size'], expected: string) => {
        const { container } = render(<IconButton size={input} onClick={jest.fn()} icon={<Icon icon={Plus} />} />);
        expect(((container.querySelector('svg') as SVGSVGElement).parentElement as HTMLElement).className).toMatch(
          expected
        );
      }
    );
  });

  it('Should disable icon button if disabled prop is true', () => {
    const { container } = render(<IconButton disabled onClick={jest.fn()} icon={<Icon icon={Plus} />} />);
    expect(container.firstChild as HTMLElement).toBeDisabled();
  });

  it('Should callback on icon button click', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<IconButton onClick={onClick} icon={<Icon icon={Plus} />} />);
    const button = getByRole('button');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe('Should set correct button type', () => {
    it('type = "submit"', () => {
      const onClick = jest.fn();
      const { getByRole } = render(<IconButton type="submit" onClick={onClick} icon={<Icon icon={Plus} />} />);
      expect(getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('type = "button" by default', () => {
      const onClick = jest.fn();
      const { getByRole } = render(<IconButton onClick={onClick} icon={<Icon icon={Plus} />} />);
      expect(getByRole('button')).toHaveAttribute('type', 'button');
    });
  });

  it('Should show tooltip on hover and hide it on click', async () => {
    const onClick = jest.fn();
    render(<IconButton onClick={onClick} icon={<Icon icon={Plus} />} tooltipLabel="tooltip" />);
    const button = screen.getByRole('button');
    userEvent.hover(button);
    const tooltip = await screen.findByRole('tooltip', { name: 'tooltip' });
    expect(tooltip).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.queryByText('tooltip')).not.toBeInTheDocument();
  });
});
