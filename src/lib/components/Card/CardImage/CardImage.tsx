import CardMedia from '@mui/material/CardMedia';

import type { FC } from 'react';
import React from 'react';
import { capitalize } from '@mui/material/utils';
import useStyles from './CardImage.styles';

export interface CardImageProps {
  image: string;
  direction: 'horizontal' | 'vertical';
  imgSize?: 'contain' | 'cover';
}

const CardImage: FC<CardImageProps> = ({ image, imgSize = 'contain', direction }) => {
  const { classes, cx } = useStyles();
  const sizeClassName = (classes as Record<string, string>)[`size${capitalize(imgSize)}`];
  const directionClassName = (classes as Record<string, string>)[`direction${capitalize(direction)}`];
  return <CardMedia className={cx(sizeClassName, directionClassName)} image={image} />;
};

export default CardImage;
