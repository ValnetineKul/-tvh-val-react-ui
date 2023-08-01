import type { FC } from 'react';
import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { useSurface } from '../../../../themes/core';
import { ReactComponent as SliderArrowLeft } from './assets/slider-arrow-left.svg';
import { ReactComponent as SliderArrowRight } from './assets/slider-arrow-right.svg';
import useStyles from './CarouselNavigation.styles';

export interface CarouselNavigationProps {
  arrowsRefs?: { prevArrowRef: React.RefObject<HTMLButtonElement>; nextArrowRef: React.RefObject<HTMLButtonElement> };
  slidesCount: number;
  defaultSlidesPerView: number;
  slidesPerView?: number;
  navigationPosition: 'topRight' | 'bottomCenter';
  className?: string;
}

const CarouselNavigation: FC<CarouselNavigationProps> = ({
  arrowsRefs,
  slidesCount,
  defaultSlidesPerView,
  slidesPerView,
  navigationPosition,
  className,
}) => {
  const { color: surfaceColor } = useSurface();
  const { classes, cx } = useStyles({ surfaceColor });

  const isNavigationHidden =
    (!!slidesPerView && slidesPerView >= slidesCount) || (!slidesPerView && slidesCount <= defaultSlidesPerView);

  return (
    <div
      className={cx(classes.arrowContainer, className, {
        [classes.navigationPositionTopEnd]: navigationPosition === 'topRight',
        [classes.navigationPositionBottomCenter]: navigationPosition === 'bottomCenter',
        [classes.hiddenNavigation]: isNavigationHidden,
      })}
    >
      <button className={cx(classes.sliderArrow, classes.prevArrow)} ref={arrowsRefs?.prevArrowRef} type="button">
        <SvgIcon component={SliderArrowLeft} className={classes.arrow} viewBox="0 0 38 18" />
      </button>
      <button className={cx(classes.sliderArrow, classes.nextArrow)} ref={arrowsRefs?.nextArrowRef} type="button">
        <SvgIcon component={SliderArrowRight} className={classes.arrow} viewBox="0 0 60 18" />
      </button>
    </div>
  );
};

export default CarouselNavigation;
