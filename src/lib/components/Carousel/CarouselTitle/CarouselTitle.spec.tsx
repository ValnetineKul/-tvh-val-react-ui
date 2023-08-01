import React from 'react';
import { render, screen } from '../../../test-utils';
import CarouselTitle from './CarouselTitle';

describe('CarouselTitle', () => {
  describe('Should set title', () => {
    it('for string', () => {
      render(<CarouselTitle title="Title" />);
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Title',
        })
      ).toBeInTheDocument();
    });

    it('for custom title', () => {
      render(<CarouselTitle title={<h6>Custom title</h6>} />);
      expect(
        screen.getByRole('heading', {
          level: 6,
          name: 'Custom title',
        })
      ).toBeInTheDocument();
    });
  });
});
