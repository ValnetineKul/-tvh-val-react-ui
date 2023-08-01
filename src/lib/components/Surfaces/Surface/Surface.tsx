import React, { forwardRef } from 'react';
import { SurfaceProvider } from '../../../../themes/core';

import useStyles from './Surface.styles';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  color: '100' | '150' | '200' | '300' | 'Primary' | 'Secondary' | 'Error' | 'Info' | 'Neutral' | 'Success' | 'Warning';
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  component?: React.ElementType;
}

const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ color = '100', border = false, children, className, component = 'div', ...props }, ref) => {
    const { classes, cx } = useStyles({ surface: color });

    const rootClassName = cx(classes.root, { [classes.border]: !!border }, className);
    return React.createElement(
      component,
      { ...props, className: rootClassName, ref },
      <SurfaceProvider color={color}>{children}</SurfaceProvider>
    );
  }
);
Surface.displayName = 'Surface';

export default Surface;
