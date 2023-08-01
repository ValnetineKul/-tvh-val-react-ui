import React from 'react';
import { render } from '../../test-utils';
import Collapse from './Collapse';

describe('Container', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <Collapse open>
        <div>children</div>
      </Collapse>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
