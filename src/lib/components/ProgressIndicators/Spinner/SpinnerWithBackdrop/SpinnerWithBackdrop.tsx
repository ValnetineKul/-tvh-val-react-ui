import React, { useState, useEffect, forwardRef } from 'react';

import Spinner from '../Spinner';
import useStyles from './SpinnerWithBackdrop.styles';
import type { SpinnerProps } from '../Spinner';
import moveIntoViewportCenter from './helpers/moveIntoViewportCenter';
import useDisabledTabIndex from './hooks/useDisabledTabIndex';
import { mergeRefs } from '../../../../utils/refs';

export interface SpinnerWithBackdropProps extends SpinnerProps {
  isLoading?: boolean;
  className?: string;
  spinnerClassName?: string;
  contentContainerClassName?: string;
  isBackdropOpaque?: boolean;
}

const SpinnerWithBackdrop = forwardRef<HTMLDivElement, React.PropsWithChildren<SpinnerWithBackdropProps>>(
  (props, inRef) => {
    const {
      children,
      isLoading = false,
      size = 'md',
      isBackdropOpaque = false,
      className,
      spinnerClassName,
      contentContainerClassName,
    } = props;
    const { classes, cx } = useStyles();
    const [spinComponent, setSpinComponent] = useState<HTMLDivElement | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isLoading && containerRef.current && spinComponent) {
        moveIntoViewportCenter({ container: containerRef.current, childComponent: spinComponent });
      }
    }, [isLoading, size, containerRef, spinComponent]);

    useDisabledTabIndex(containerRef.current, isLoading);

    return (
      <div className={cx(classes.root, className)} ref={mergeRefs([containerRef, inRef])}>
        {isLoading && (
          <div ref={(ref) => setSpinComponent(ref)} className={classes.spin}>
            <Spinner size={size} className={spinnerClassName} />
          </div>
        )}
        <div
          className={cx(
            { [classes.spinContainerBlur]: isLoading, [classes.isBackdropOpaque]: isLoading && isBackdropOpaque },
            contentContainerClassName
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

SpinnerWithBackdrop.displayName = 'SpinnerWithBackdrop';
export default SpinnerWithBackdrop;
