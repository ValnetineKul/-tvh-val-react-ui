import React from 'react';
import { render, screen } from '../../../test-utils';
import { Sparkles } from '../../Icon/icons/functional';
import FlagTag from './FlagTag';

describe('FlagTag', () => {
  it('Should render correctly', () => {
    const { container } = render(<FlagTag message="promo" icon={Sparkles} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should not render label', () => {
    render(<FlagTag message="promo" icon={Sparkles} hasLabel={false} />);
    expect(screen.queryByText(/PROMO/)).not.toBeInTheDocument();
  });

  it('Should render text icon', () => {
    render(<FlagTag message="warranty" icon="2Y" hasLabel={false} />);
    expect(screen.getByText(/2Y/)).toBeInTheDocument();
  });

  describe('Should set size', () => {
    const cases = [
      [undefined, 'FlagTag-sizeMd'],
      ['xs', 'FlagTag-sizeXs'],
      ['sm', 'FlagTag-sizeSm'],
      ['md', 'FlagTag-sizeMd'],
    ];
    it.each(cases)('given %p, returns %p', (input: React.ComponentProps<typeof FlagTag>['size'], expected: string) => {
      const { container } = render(<FlagTag message="promo" icon={Sparkles} size={input} />);
      expect((container.firstChild as HTMLElement).className).toMatch(expected);
    });
  });
});
