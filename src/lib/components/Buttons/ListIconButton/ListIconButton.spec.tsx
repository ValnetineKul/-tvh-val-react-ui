import React from 'react';
import { render, userEvent, screen } from '../../../test-utils';
import ListIconButton from './ListIconButton';

describe('ListIconButton', () => {
  it('Should render correctly', () => {
    const { container } = render(<ListIconButton onClick={jest.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should callback on button click', () => {
    const onClick = jest.fn();
    render(<ListIconButton onClick={onClick} />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should be not clickable when disabled', () => {
    const onClick = jest.fn();
    render(<ListIconButton onClick={onClick} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  describe('Should set icon size', () => {
    const cases = [
      [undefined, 'ListIconButton-sizeMd'],
      ['sm', 'ListIconButton-sizeSm'],
      ['md', 'ListIconButton-sizeMd'],
    ];
    it.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof ListIconButton>['size'], expected: string) => {
        render(<ListIconButton size={input} onClick={jest.fn()} />);
        const button = screen.getByRole('button');
        expect(button.className).toMatch(expected);
      }
    );
  });
});
