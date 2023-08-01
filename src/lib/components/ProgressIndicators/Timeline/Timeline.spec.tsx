import type { ComponentProps } from 'react';
import React from 'react';
import { render } from '../../../test-utils';
import { Inbox } from '../../Icon/icons/functional';
import Timeline from './Timeline';

type Props = ComponentProps<typeof Timeline>;

const items: Props['items'] = [
  {
    label: 'Received',
    icon: Inbox,
    description: 'We have received your request.',
  },
  {
    label: 'Research',
    icon: Inbox,
    description: 'Our researchers are looking for your parts.',
  },
  {
    label: 'Resolved',
    icon: Inbox,
    description: ['Our researchers are looking for your parts.', 'Description line 2', 'Third description'],
  },
  {
    label: 'Resolved',
    icon: Inbox,
    description: 'Our researchers are looking for your parts.',
    hasWarning: true,
  },
];

describe('Timeline', () => {
  it('Should render correctly', () => {
    const { container } = render(<Timeline items={items} activeItem={1} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Should render vertical correctly', () => {
    const { container } = render(<Timeline items={items} activeItem={1} direction="vertical" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Altering', () => {
    it('Should render altering correctly', () => {
      const { container } = render(<Timeline items={items} activeItem={1} isAltering />);
      expect(container.firstChild).toMatchSnapshot();
    });
    it('Should render vertical altering correctly', () => {
      const { container } = render(<Timeline items={items} activeItem={1} direction="vertical" isAltering />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
