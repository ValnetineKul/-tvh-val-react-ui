import React, { forwardRef } from 'react';
import { Backdrop, capitalize } from '@mui/material';
import useStyles from './Scrim.styles';

export interface ScrimProps {
  isOpen: boolean;
  variant?: 'light' | 'dark';
  innerChildren?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Scrim = forwardRef<unknown, ScrimProps>(
  ({ variant = 'light', isOpen, innerChildren, children, className, onClick }, ref) => {
    const { classes, cx } = useStyles();
    const variantClassName = (classes as Record<string, string>)[`root${capitalize(variant)}`];

    return (
      <div className={classes.root}>
        <Backdrop
          open={isOpen}
          className={cx(classes.backdropRoot, variantClassName, className)}
          ref={ref}
          onClick={onClick}
        >
          {innerChildren}
        </Backdrop>
        {children}
      </div>
    );
  }
);
Scrim.displayName = 'Scrim';

export default Scrim;
