import React from 'react';
import { render } from '../../../test-utils';
import StatusTag from './StatusTag';

describe('StatusTag', () => {
  it('Should render correctly', () => {
    const { container } = render(<StatusTag label="StatusTag text" subLabel="SubStatus text" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Should set size', () => {
    const cases = [
      [undefined, 'Typography-body500'],
      ['sm', 'Typography-body400'],
      ['md', 'Typography-body500'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof StatusTag>['size'], expected: string) => {
        const { getByText } = render(<StatusTag size={input} label="StatusTag text" />);
        expect(getByText('StatusTag text').className).toMatch(expected);
      }
    );
  });
});
