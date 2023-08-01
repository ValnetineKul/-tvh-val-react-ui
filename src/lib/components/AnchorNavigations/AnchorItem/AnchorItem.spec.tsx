import React from 'react';
import { render } from '../../../test-utils';
import AnchorItem from './AnchorItem';

const item = {
  label: 'linkLabel',
  link: '/link/to/get/tabpanel',
  id: 'linkId',
};
describe('AnchorNavigation', () => {
  it('Should render correctly', () => {
    const { container } = render(<AnchorItem item={item} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
