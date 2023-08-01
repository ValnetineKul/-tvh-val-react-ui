import React from 'react';
import { render } from '../../../test-utils';

import Surface from './Surface';

describe('Surface', () => {
  it('Should set border', () => {
    const { container } = render(
      <Surface color="100" border>
        Test
      </Surface>
    );
    expect((container.firstChild as HTMLElement).className).toMatch('Surface-border');
  });

  it('Should add classname', () => {
    const { container } = render(
      <Surface color="100" className="customClassName">
        Test
      </Surface>
    );
    expect((container.firstChild as HTMLElement).className).toMatch('customClassName');
  });
});
