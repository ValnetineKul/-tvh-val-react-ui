import type { FC } from 'react';
import React from 'react';
import { default as MuiCardContent } from '@mui/material/CardContent';
import useStyles from './CardContent.styles';

export interface CardContentProps {
  className?: string;
}

const CardContent: FC<CardContentProps> = ({ className, children }) => {
  const { classes, cx } = useStyles();
  return <MuiCardContent className={cx(classes.root, className)}>{children}</MuiCardContent>;
};

export default CardContent;
