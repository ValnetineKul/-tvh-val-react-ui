import React from 'react';
import Spinner from './Spinner';
import { render } from '../../../test-utils';

describe('Spinner', () => {
  it('Should render correctly', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toMatchSnapshot('Spinner');
  });
});
