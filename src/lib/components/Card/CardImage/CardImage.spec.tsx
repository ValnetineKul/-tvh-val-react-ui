import React from 'react';
import { render } from '../../../test-utils';
import CardImage from './CardImage';
import filterImage from '../mocked-assets/filter.jpg';

describe('CardImage', () => {
  it('Should render correctly', () => {
    const { container } = render(<CardImage image={filterImage} direction="vertical" imgSize="contain" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
