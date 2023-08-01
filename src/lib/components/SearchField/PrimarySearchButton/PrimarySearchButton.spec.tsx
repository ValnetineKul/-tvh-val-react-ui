import React from 'react';
import type { ComponentProps } from 'react';
import PrimarySearchButton from './PrimarySearchButton';
import { render, userEvent } from '../../../test-utils';

type Props = ComponentProps<typeof PrimarySearchButton>;

describe('PrimarySearchButton', () => {
  it('Should render correctly', () => {
    const { container } = render(<PrimarySearchButton />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should show icon', () => {
    const { getByText } = render(<PrimarySearchButton />);
    expect(getByText(/search.svg/)).toBeInTheDocument();
  });

  it('Should show icon with label', () => {
    const { getByText } = render(<PrimarySearchButton label="Label" />);
    expect(getByText(/search.svg/)).toBeInTheDocument();
    expect(getByText('Label')).toBeInTheDocument();
  });

  it('Should invoke callback function', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<PrimarySearchButton onClick={handleClick} />);
    const button = getByRole('button');
    userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Should render spinner', () => {
    const { getByRole } = render(<PrimarySearchButton label="Label" isLoading />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  describe('Should set size', () => {
    const cases: [Props['size'], string][] = [
      [undefined, 'PrimarySearchButton-sizeSm'],
      ['xs', 'PrimarySearchButton-sizeXs'],
      ['sm', 'PrimarySearchButton-sizeSm'],
    ];
    test.each(cases)('given %p, returns %p', (input, expected) => {
      const { getByRole } = render(<PrimarySearchButton size={input} />);
      const button = getByRole('button');
      expect(button.className).toMatch(expected);
    });
  });

  it('Should set correct button type', () => {
    const { getByRole } = render(<PrimarySearchButton />);
    const button = getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});
