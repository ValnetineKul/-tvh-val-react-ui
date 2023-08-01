import React from 'react';
import type { ComponentProps } from 'react';
import { render, screen } from '../../test-utils';
import Logo from './Logo';

type Props = ComponentProps<typeof Logo>;

describe('Logo', () => {
  it('Should render correctly', () => {
    const { baseElement } = render(<Logo size="sm" />);
    expect(baseElement).toMatchSnapshot();
  });

  describe('Should set logo size', () => {
    const cases: [Props['size'], string][] = [
      [undefined, 'Logo-sizeSm'],
      ['sm', 'Logo-sizeSm'],
      ['md', 'Logo-sizeMd'],
    ];
    test.each(cases)('given %p, returns %p', (input, expected) => {
      render(<Logo size={input} />);
      const image = screen.getByAltText('Logo');
      expect(image.className).toMatch(expected);
    });
  });

  it('Should set custom alt text', () => {
    const customAlt = 'Alt text';
    render(<Logo alt={customAlt} />);
    const logoImage = screen.getByAltText(customAlt);
    expect(logoImage).toBeInTheDocument();
  });
});
