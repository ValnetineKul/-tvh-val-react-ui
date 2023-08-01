import React from 'react';
import { render } from '../../../test-utils';
import CarouselNavigation from './CarouselNavigation';

describe('CarouselNavigation', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <CarouselNavigation slidesCount={5} defaultSlidesPerView={2} navigationPosition="bottomCenter" />
    );
    expect(container).toMatchSnapshot();
  });
});
