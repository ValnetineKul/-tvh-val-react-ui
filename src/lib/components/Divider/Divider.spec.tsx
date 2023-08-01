import React from 'react';
import { render } from '../../test-utils';
import Divider from './Divider';

describe('Divider', () => {
  it('Should render correctly', () => {
    const { container } = render(<Divider />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
