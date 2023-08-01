import React from 'react';
import ListItem from './ListItem';
import { render } from '../../../../test-utils';
import { Check } from '../../../Icon/icons/functional';

describe('ListItem', () => {
  it('Should render correctly', () => {
    const { container } = render(<ListItem>ListItem Item</ListItem>);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('Should render with icon correctly', () => {
    const { container } = render(<ListItem icon={Check}>ListItem Item</ListItem>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
