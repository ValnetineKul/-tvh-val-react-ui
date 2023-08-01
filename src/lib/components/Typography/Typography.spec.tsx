import React from 'react';
import { render } from '../../test-utils';
import Typography from './Typography';

describe('Typography', () => {
  it('Should render correctly', () => {
    const { container } = render(<Typography>Sample text</Typography>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
