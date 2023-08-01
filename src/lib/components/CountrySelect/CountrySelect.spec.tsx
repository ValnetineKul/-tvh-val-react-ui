import React from 'react';
import { render } from '../../test-utils';
import CountrySelect from './CountrySelect';

describe('CountrySelect', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <CountrySelect label="label" options={[{ code: 'BE', name: 'Belgium' }]} onChange={jest.fn()} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
