import React from 'react';
import { render } from '../../../test-utils';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('Should render correctly', () => {
    const { container } = render(<Navigation>Children</Navigation>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
