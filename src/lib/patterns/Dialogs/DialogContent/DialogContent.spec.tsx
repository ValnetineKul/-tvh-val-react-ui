import React from 'react';
import { render } from '../../../test-utils';
import DialogContent from './DialogContent';

describe('DialogContent', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <DialogContent>
        <span>Dialog content</span>
      </DialogContent>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
