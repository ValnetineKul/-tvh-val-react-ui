import React from 'react';
import SkeletonText from './SkeletonText';
import { render } from '../../../../test-utils';

describe('SkeletonText', () => {
  it('Should render correctly', () => {
    const { container } = render(<SkeletonText bodyLinesCount={3} heading="h1" />);
    expect(container.firstChild).toMatchSnapshot('SkeletonText');
  });
});
