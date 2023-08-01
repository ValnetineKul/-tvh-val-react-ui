import React from 'react';
import { render } from '../../../test-utils';
import CardAction from './CardAction';

describe('CardAction', () => {
  it('Should render correctly', () => {
    const { container } = render(<CardAction>Card action button</CardAction>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
