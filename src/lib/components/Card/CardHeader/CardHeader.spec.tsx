import React from 'react';
import { render } from '../../../test-utils';
import CardHeader from './CardHeader';

describe('CardHeader', () => {
  it('Should render correctly', () => {
    const { container } = render(<CardHeader title="Card title" subtitle="Card subtitle" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
