import React from 'react';
import { userEvent, render } from '../../../test-utils';
import SplitButton from './SplitButton';
import { ShoppingBasket } from '../../Icon/icons/functional';
import Icon from '../../Icon';

describe('SplitButton', () => {
  it('Should render correctly', () => {
    const { container } = render(<SplitButton icon={<Icon icon={ShoppingBasket} />} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Should set button size', () => {
    const cases = [
      [undefined, 'Button-sizeMd-'],
      ['md', 'Button-sizeMd-'],
      ['lg', 'Button-sizeLg-'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof SplitButton>['size'], expected: string) => {
        const { getAllByRole } = render(<SplitButton size={input} label="Label" />);
        const buttons = getAllByRole('button');
        expect((buttons[0] as HTMLElement).className).toMatch(expected);
        expect((buttons[1] as HTMLElement).className).toMatch(expected);
      }
    );
  });

  it('Should disable SplitButton if disabled prop is true', () => {
    const { getAllByRole } = render(<SplitButton disabled label="Label" />);
    const buttons = getAllByRole('button');

    expect(buttons[0] as HTMLElement).toBeDisabled();
    expect((buttons[0] as HTMLElement).className).toMatch('Mui-disabled');

    expect(buttons[1] as HTMLElement).toBeDisabled();
    expect((buttons[1] as HTMLElement).className).toMatch('Mui-disabled');
  });

  it('Should call onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(<SplitButton onClick={onClick} label="Label" />);
    const button = getByText('Label');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Should call onDropdownClick', () => {
    const onDropdownClick = jest.fn();
    const { getAllByRole } = render(<SplitButton onDropdownClick={onDropdownClick} label="Label" />);
    const buttons = getAllByRole('button');

    userEvent.click(buttons[1]);
    expect(onDropdownClick).toHaveBeenCalledTimes(1);
  });
});
