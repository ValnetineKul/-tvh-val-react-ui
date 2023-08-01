import type { FC } from 'react';
import React from 'react';
import { default as MuiContainer } from '@mui/material/Container';

import useStyles from './Container.styles';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  disableGutters?: boolean;
}

const Container: FC<ContainerProps> = ({ children, className, disableGutters }) => {
  const { classes, cx } = useStyles();
  return (
    <MuiContainer className={cx(classes.root, { [classes.disableGutters]: disableGutters }, className)}>
      <>{children}</>
    </MuiContainer>
  );
};

export default Container;
