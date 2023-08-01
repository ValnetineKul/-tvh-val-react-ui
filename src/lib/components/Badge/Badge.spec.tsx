import React from 'react';
import { render, screen } from '../../test-utils';
import Icon from '../Icon';
import { Bell } from '../Icon/icons/functional';
import Badge from './Badge';

const props: React.ComponentProps<typeof Badge> = {
  count: 55,
  overflowCount: 999,
  variant: 'primary',
  type: 'standard',
};

const iconProps: React.ComponentProps<typeof Badge> = {
  ...props,
  isIcon: true,
  iconSize: 'md',
  children: <Icon icon={Bell} />,
};

describe('Badge', () => {
  describe('Should render correct', () => {
    it('Should render children and badge with count', () => {
      render(<Badge {...props}>testChildren</Badge>);
      expect(screen.getByText(/testChildren/)).toBeInTheDocument();
      expect(screen.getByText('55')).toBeInTheDocument();
    });

    it('Should render icon and badge with count', () => {
      const { container } = render(<Badge {...iconProps} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
      expect(screen.getByText('55')).toBeInTheDocument();
    });
  });

  describe('Should not render badge with count', () => {
    const cases = [0, -1, -100];
    test.each(cases)('given %p', (input: React.ComponentProps<typeof Badge>['count']) => {
      render(<Badge {...props} count={input} />);
      expect(screen.queryByText(input)).not.toBeInTheDocument();
    });
  });

  it('Should render badge with count', () => {
    render(<Badge {...iconProps} />);
    expect(screen.getByText('55')).toBeInTheDocument();
  });

  it('Should set overflowCount', () => {
    render(<Badge {...props} count={100000000} />);
    expect(screen.getByText(`${props.overflowCount}+`)).toBeInTheDocument();
  });

  it('Should not render badge', () => {
    render(<Badge {...iconProps} type="dot" />);
    expect(screen.queryByText('55')).not.toBeInTheDocument();
  });

  it('Should not render badge with count on small icon', () => {
    render(<Badge {...iconProps} iconSize="sm" />);
    expect(screen.queryByText('55')).not.toBeInTheDocument();
  });

  it('Should show badge with overflow value', () => {
    render(<Badge {...iconProps} count={1000} />);
    expect(screen.getByText('999+')).toBeInTheDocument();
  });
});
