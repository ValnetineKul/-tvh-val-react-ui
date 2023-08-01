import React from 'react';
import { render } from '../../../test-utils';
import FlagIcon from './FlagIcon';

describe('FlagIcon', () => {
  it('Should render correctly', () => {
    const { container } = render(<FlagIcon countryCode="BE" country="Belgium" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
