import React from 'react';
import SkeletonCard from './SkeletonCard';
import { render } from '../../../../test-utils';

describe('SkeletonCard', () => {
  it('Should render correctly', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.firstChild).toMatchSnapshot('SkeletonCard');
  });
});
