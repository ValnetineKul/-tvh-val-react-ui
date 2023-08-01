import type { FC } from 'react';
import React from 'react';
import Typography from '../../Typography';

export interface CarouselTitleProps {
  title: string | React.ReactElement;
}

const CarouselTitle: FC<CarouselTitleProps> = ({ title }) => {
  if (typeof title === 'string') {
    return (
      <Typography headerType="commercial" variant="h2">
        {title}
      </Typography>
    );
  }
  return title;
};

export default CarouselTitle;
