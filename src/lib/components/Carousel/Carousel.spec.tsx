import React from 'react';
import { render, screen } from '../../test-utils';
import Carousel from './Carousel';

const slides = new Array(10).fill(null).map((_, idx) => {
  return <span>{`Slider ${idx}`}</span>;
});

describe('Carousel', () => {
  it('Should render slides', () => {
    render(<Carousel slides={slides} />);
    expect(screen.getAllByText(/Slide/)).toHaveLength(10);
  });

  describe('Carousel control', () => {
    it('Should have navigation arrows', () => {
      render(<Carousel slides={slides} />);
      expect(screen.getByRole('button', { name: 'Previous slide' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next slide' })).toBeInTheDocument();
    });

    it('Should hide navigation arrows if slided number is the same as slidesPerView', () => {
      render(<Carousel slides={slides} slidesPerView={slides.length} />);
      expect(screen.queryByRole('button', { name: 'Previous slide' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Next slide' })).not.toBeInTheDocument();
    });

    it('Should hide navigation arrows if slided number is more than slidesPerView', () => {
      render(<Carousel slides={slides} slidesPerView={slides.length + 1} />);
      expect(screen.queryByRole('button', { name: 'Previous slide' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Next slide' })).not.toBeInTheDocument();
    });
  });

  describe('Should set 2 possible positions for the carousel control', () => {
    const cases = [
      [undefined, 'CarouselNavigation-navigationPositionBottomCenter'],
      ['topRight', 'CarouselNavigation-navigationPositionTopEnd'],
      ['bottomCenter', 'CarouselNavigation-navigationPositionBottomCenter'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof Carousel>['navigationPosition'], expected: string) => {
        render(<Carousel navigationPosition={input} slides={slides} />);
        const slideNavigationButton = screen.getByRole('button', { name: 'Previous slide' });
        const carouselNavigation = slideNavigationButton.parentElement;
        expect(carouselNavigation?.className).toMatch(expected);
      }
    );
  });
});
