import React from 'react';
import { render } from '../../../test-utils';

import ChipGroup from './ChipGroup';

describe('ChipGroup', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <ChipGroup>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ChipGroup>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
