import React from 'react';
import { render } from '../../../test-utils';
import CardContent from './CardContent';

describe('CardContent', () => {
  it('Should render correctly', () => {
    const { container } = render(<CardContent>Card content here</CardContent>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
