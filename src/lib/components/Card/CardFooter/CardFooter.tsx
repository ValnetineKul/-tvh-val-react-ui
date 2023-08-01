import type { FC } from 'react';
import React from 'react';
import { default as CardActions } from '../CardAction/CardAction';
import useStyles from './CardFooter.styles';

export interface CardFooterProps {
  className?: string;
}

const CardFooter: FC<CardFooterProps> = ({ className, children }) => {
  const { classes, cx } = useStyles();
  return <CardActions className={cx(classes.root, className)}>{children}</CardActions>;
};

export default CardFooter;
