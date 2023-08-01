import type { FC } from 'react';
import React from 'react';
import CardActions from '@mui/material/CardActions';
import useStyles from './CardAction.styles';

export interface CardActionProps {
  className?: string;
}

const CardAction: FC<CardActionProps> = ({ className, children }) => {
  const { classes, cx } = useStyles();
  return <CardActions className={cx(classes.root, className)}>{children}</CardActions>;
};

export default CardAction;
