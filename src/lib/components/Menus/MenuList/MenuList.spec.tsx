import React from 'react';
import { render } from '../../../test-utils';
import MenuList from './MenuList';

describe('MenuItem', () => {
  it('Should render correctly', () => {
    const { container } = render(<MenuList>Children</MenuList>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
