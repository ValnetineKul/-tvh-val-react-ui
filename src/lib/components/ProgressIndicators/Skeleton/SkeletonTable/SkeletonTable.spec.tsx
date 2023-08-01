import React from 'react';
import SkeletonTable from './SkeletonTable';
import { render } from '../../../../test-utils';

describe('SkeletonTable', () => {
  it('Should render correctly', () => {
    const { container } = render(<SkeletonTable rows={3} cols={5} />);
    expect(container.firstChild).toMatchSnapshot('SkeletonTable');
  });
});
