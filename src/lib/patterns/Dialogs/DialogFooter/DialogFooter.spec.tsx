import React from 'react';
import { render, userEvent } from '../../../test-utils';
import DialogFooter from './DialogFooter';
import Button from '../../../components/Buttons/Button/Button';

const props = {
  actionButtons: [<Button variant="primary" label="Primary" />],
};

describe('DialogFooter', () => {
  it('Should render correctly', () => {
    const { container } = render(<DialogFooter {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Should render alternative action', () => {
    it('button', () => {
      const { getByRole } = render(<DialogFooter {...props} alternativeAction="AlternativeAction" />);
      const button = getByRole('button', { name: 'AlternativeAction' });
      expect(button).toBeInTheDocument();
      expect(button.className).toMatch('Button-variantLink');
    });

    it('link', () => {
      const { getByRole } = render(<DialogFooter {...props} alternativeAction="AlternativeAction" href="/test" />);
      const link = getByRole('link', { name: 'AlternativeAction' });
      expect(link).toBeInTheDocument();
      expect(link.className).toMatch('Button-variantLink');
    });

    it('with callback', () => {
      const onAlternativeActionClick = jest.fn();
      const { getByRole } = render(
        <DialogFooter
          {...props}
          alternativeAction="AlternativeAction"
          onAlternativeActionClick={onAlternativeActionClick}
        />
      );
      const button = getByRole('button', { name: 'AlternativeAction' });
      userEvent.click(button);
      expect(onAlternativeActionClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Should set modal action buttons direction', () => {
    const cases = [
      [undefined, 'DialogFooter-directionVertical'],
      ['horizontal', 'DialogFooter-directionHorizontal'],
      ['vertical', 'DialogFooter-directionVertical'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof DialogFooter>['direction'], expected: string) => {
        const { getByRole } = render(<DialogFooter direction={input} {...props} />);
        const buttonsList = getByRole('list');
        expect(buttonsList.className).toMatch(expected);
      }
    );
  });
});
