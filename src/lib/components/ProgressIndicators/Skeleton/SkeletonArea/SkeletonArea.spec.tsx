import React from 'react';
import SkeletonArea from './SkeletonArea';
import { render } from '../../../../test-utils';

describe('SkeletonArea', () => {
  it('Should render correctly', () => {
    const { container } = render(<SkeletonArea width="200px" height="200px" />);
    expect(container.firstChild).toMatchSnapshot('SkeletonArea');
  });
});
