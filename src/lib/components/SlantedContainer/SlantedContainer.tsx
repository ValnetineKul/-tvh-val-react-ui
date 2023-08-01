import type { FC, ReactNode } from 'react';
import React, { useRef, useState, useLayoutEffect } from 'react';
import { capitalize } from '@mui/material/utils';
import type { Surface } from '../../../themes/core';
import useStyles from './SlantedContainer.styles';
import { default as SurfaceComponent } from '../Surfaces/Surface';

export interface SlantedContainerProps {
  className?: string;
  slant?: 'both' | 'start' | 'end';
  surfaceColor?: Surface;
  padding?: 'none' | '200' | '300';
  children: ReactNode;
}

const SlantedContainer: FC<SlantedContainerProps> = ({
  className,
  slant = 'both',
  surfaceColor = 'Primary',
  padding = 'none',
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [slantOffset, setSlantOffset] = useState(0);
  const { classes, cx } = useStyles({ slantOffset });
  const paddingClassName = (classes as Record<string, string>)[`padding${capitalize(padding)}`];
  const skewedClassName = cx({
    [classes.skewedStart]: slant === 'both' || slant === 'start',
    [classes.skewedEnd]: slant === 'both' || slant === 'end',
  });

  useLayoutEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      setSlantOffset(entry.contentRect.height * 0.09);
    };

    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={classes.root}>
      <SurfaceComponent color={surfaceColor} className={cx(classes.innerRoot, skewedClassName, className)} ref={ref}>
        <div className={cx(paddingClassName)}>{children}</div>
      </SurfaceComponent>
    </div>
  );
};

export default SlantedContainer;
