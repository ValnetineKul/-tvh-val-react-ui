import React from 'react';
import { render } from '../../../test-utils';
import CardFooter from './CardFooter';

describe('CardFooter', () => {
  it('Should render correctly', () => {
    const { container } = render(<CardFooter>Action buttons</CardFooter>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
