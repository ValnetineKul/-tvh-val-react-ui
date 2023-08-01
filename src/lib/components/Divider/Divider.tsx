import React from 'react';
import type { FC } from 'react';
import { Divider as DividerTemplate } from '@mui/material';

import useStyles from './Divider.styles';

export interface DividerProps {
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

const Divider: FC<DividerProps> = ({ direction = 'horizontal', className, ...restProps }) => {
  const { classes, cx } = useStyles();

  const cls = cx(classes.root, className, {
    [classes['horizontal']]: direction === 'horizontal',
    [classes['vertical']]: direction === 'vertical',
  });

  return <DividerTemplate className={cls} orientation={direction} flexItem={direction === 'vertical'} {...restProps} />;
};

export default Divider;
