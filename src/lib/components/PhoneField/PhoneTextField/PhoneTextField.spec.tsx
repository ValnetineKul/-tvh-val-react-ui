import React from 'react';
import { render } from '../../../test-utils';
import PhoneTextField from './PhoneTextField';

describe('PhoneTextField', () => {
  it('Should render correctly', () => {
    const { container } = render(<PhoneTextField readOnly />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
