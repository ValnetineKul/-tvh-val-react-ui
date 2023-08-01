import React from 'react';
import { render } from '../../../test-utils';
import TableContainer from './TableContainer';

describe('TableContainer', () => {
  it('Should render correctly', () => {
    const { container } = render(<TableContainer>Children</TableContainer>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
