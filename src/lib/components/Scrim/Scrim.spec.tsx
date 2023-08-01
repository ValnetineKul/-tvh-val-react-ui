import React from 'react';
import { render } from '../../test-utils';
import Scrim from './Scrim';

describe('Surface', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <Scrim isOpen innerChildren="InnerChildren">
        Children
      </Scrim>
    );
    expect((container.firstChild as HTMLElement).className).toMatchSnapshot();
  });
});
