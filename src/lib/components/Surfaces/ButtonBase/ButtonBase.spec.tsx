import React from 'react';
import { render, screen } from '../../../test-utils';

import ButtonBase from './ButtonBase';

describe('ButtonBase', () => {
  it('Should set border', () => {
    render(
      <ButtonBase color="100" border>
        Test
      </ButtonBase>
    );
    expect(screen.getByText('Test', { selector: 'button' }).className).toMatch('ButtonBase-border-');
  });
  it('Should add classname', () => {
    render(
      <ButtonBase color="100" className="customClassName">
        Test
      </ButtonBase>
    );
    expect(screen.getByText('Test', { selector: 'button' }).className).toMatch('customClassName');
  });

  it('Should set correct tabIndex', () => {
    render(
      <ButtonBase color="100" className="customClassName" tabIndex={-1}>
        Test
      </ButtonBase>
    );
    expect(screen.getByText('Test', { selector: 'button' })).toHaveAttribute('tabindex', '-1');
  });

  it('Should set correct button type', () => {
    render(
      <ButtonBase color="100" className="customClassName" type="submit">
        Test
      </ButtonBase>
    );
    expect(screen.getByText('Test', { selector: 'button' })).toHaveAttribute('type', 'submit');
  });

  describe('Should set focus style', () => {
    const cases = [
      [undefined, 'ButtonBase-focusOut'],
      ['out', 'ButtonBase-focusOut'],
      ['inset', 'ButtonBase-focusInset'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof ButtonBase>['focus'], expected: string) => {
        render(
          <ButtonBase color="100" focus={input}>
            Test
          </ButtonBase>
        );
        expect(screen.getByText('Test', { selector: 'button' }).className).toMatch(expected);
      }
    );
  });
});
