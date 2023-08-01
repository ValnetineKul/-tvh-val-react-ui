import type { FC } from 'react';
import React, { useRef } from 'react';
import SwiperCore, { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselNavigation from './CarouselNavigation';
import CarouselTitle from './CarouselTitle';
import useStyles from './Carousel.styles';

const DEFAULT_SLIDER_PER_VIEW = 4;
const SPACE_BETWEEN_SLIDES = 24;
const MIN_TOUCH_DISTANCE_TO_MOVE_SWIPER = 10;

SwiperCore.use([Navigation, A11y]);
export interface CarouselProps {
  slides: React.ReactElement[];
  slidesPerView?: number;
  navigationPosition?: 'topRight' | 'bottomCenter';
  title?: string | React.ReactElement;
}

const Carousel: FC<CarouselProps> = ({
  slides,
  slidesPerView = DEFAULT_SLIDER_PER_VIEW,
  navigationPosition = 'bottomCenter',
  title,
}) => {
  const { classes, cx } = useStyles();

  const nextArrowRef = useRef<HTMLButtonElement>(null);
  const prevArrowRef = useRef<HTMLButtonElement>(null);

  return (
    <section className={cx(classes.root, { [classes.container]: navigationPosition === 'bottomCenter' })}>
      <div className={classes.titleWrapper}>
        {title && <CarouselTitle title={title} />}
        <CarouselNavigation
          arrowsRefs={{ prevArrowRef, nextArrowRef }}
          slidesCount={slides.length}
          slidesPerView={slidesPerView}
          defaultSlidesPerView={DEFAULT_SLIDER_PER_VIEW}
          navigationPosition={navigationPosition}
          className={cx({ [classes.titleGap]: !!title && navigationPosition === 'topRight' })}
        />
      </div>
      <Swiper
        spaceBetween={SPACE_BETWEEN_SLIDES}
        slidesPerView={slidesPerView}
        shortSwipes
        threshold={MIN_TOUCH_DISTANCE_TO_MOVE_SWIPER}
        observer
        observeParents
        navigation={{
          prevEl: prevArrowRef.current,
          nextEl: nextArrowRef.current,
        }}
        onInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = prevArrowRef.current;
            swiper.params.navigation.nextEl = nextArrowRef.current;
          }
        }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className={classes.swiperSlide}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Carousel;
