import React from 'react';
import List from './List';
import ListItem from './ListItem';
import { render } from '../../../test-utils';

describe('List', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <List>
        <ListItem>List Item</ListItem>
      </List>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
