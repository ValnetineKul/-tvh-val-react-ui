import type { FC } from 'react';
import React, { useContext, useLayoutEffect, useRef } from 'react';
import useStyles from './TableFixedColumn.styles';
import { ShadowsContext } from '../Table';

export interface TableFixedColumnProps {
  position?: 'start' | 'end';
}

const TableFixedColumn: FC<TableFixedColumnProps> = ({ children, position = 'start' }) => {
  const { classes, cx } = useStyles();
  const { shouldShowVerticalShadowStart, shouldShowVerticalShadowEnd } = useContext(ShadowsContext);
  const shadowClass = position === 'start' ? classes.start : classes.end;
  const childrenLength = React.Children.count(children);
  const cellsRef = useRef<Array<HTMLTableCellElement | null>>([]);
  cellsRef.current = [];

  const addToRefs = (el: HTMLTableCellElement) => {
    if (el && !cellsRef.current.includes(el)) {
      if (position === 'start') cellsRef.current.push(el);
      else cellsRef.current.unshift(el);
    }
  };

  const checkShowShadow = (index: number) => {
    if (position === 'start') return shouldShowVerticalShadowStart && index === childrenLength - 1;
    return shouldShowVerticalShadowEnd && index === 0;
  };

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ref: addToRefs,
        className: cx(classes.root, { [shadowClass]: checkShowShadow(index) }, child.props.className),
      });
    }
    return child;
  });

  const getOffset = (cellIndex: number) => {
    let offset = 0;
    cellsRef.current.forEach((cell, index) => {
      if (!cell || index >= cellIndex) return;
      offset += cell.offsetWidth;
    });

    return offset;
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      cellsRef.current.forEach((cell, index) => {
        const where = position === 'start' ? 'left' : 'right';
        if (cell) {
          if (index === 0) {
            cell.style[where] = '0';
          } else {
            cell.style[where] = `${getOffset(index)}px`;
          }
        }
      });
    };

    if (!cellsRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(handleResize);
    cellsRef.current.forEach((ref) => {
      if (!ref) return;
      resizeObserver.observe(ref);
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [position]);

  return <>{childrenWithProps}</>;
};

export default TableFixedColumn;
