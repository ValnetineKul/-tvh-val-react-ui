import React from 'react';
import { render } from '../../../test-utils';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  it('Should render correctly', () => {
    const { container } = render(<ProgressBar progress={50} endLabel="50%" />);
    expect(container.firstChild).toMatchSnapshot('progressbar');
  });
});
