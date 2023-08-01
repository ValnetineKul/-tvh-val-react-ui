import React from 'react';
import { render, screen } from '../../../test-utils';
import Icon from '../../Icon';
import { Pen } from '../../Icon/icons/functional';
import Tag from './Tag';

describe('Tag', () => {
  it('Should render correctly', () => {
    const { container } = render(<Tag label="Tag text" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Should set size', () => {
    const cases = [
      [undefined, 'Typography-body500'],
      ['sm', 'Typography-body400'],
      ['md', 'Typography-body500'],
    ];
    test.each(cases)('given %p, returns %p', (input: React.ComponentProps<typeof Tag>['size'], expected: string) => {
      render(<Tag label="Tag text" size={input} />);
      expect(screen.getByText('Tag text').className).toMatch(expected);
    });
  });

  describe('Should set color', () => {
    const cases = [
      [undefined, 'Tag-colorPrimary'],
      ['primary', 'Tag-colorPrimary'],
      ['secondary', 'Tag-colorSecondary'],
    ];
    test.each(cases)('given %p, returns %p', (input: React.ComponentProps<typeof Tag>['color'], expected: string) => {
      const { container } = render(<Tag label="Tag text" color={input} />);
      expect((container.firstChild as HTMLElement).className).toMatch(expected);
    });
  });

  it('Should have startIcon', () => {
    render(<Tag label="Label" startIcon={<Icon icon={Pen} title="startIcon" />} />);
    const el = screen.getByText('pen.svg');
    expect(el).toBeInTheDocument();
  });
});
