import type { FC } from 'react';
import React from 'react';
import useStyles from './Grid.styles';

type Cols = false | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridProps {
  children: React.ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: Cols;
  sm?: Cols;
  md?: Cols;
  lg?: Cols;
}

const Grid: FC<GridProps> = ({
  children,
  container = false,
  item = false,
  xs = false,
  sm = false,
  md = false,
  lg = false,
}) => {
  const { classes, cx } = useStyles();

  const className = cx({
    [classes.container]: container,
    [classes.item]: item,

    [(classes as Record<string, string>)[`xs${xs}`]]: xs !== false,
    [(classes as Record<string, string>)[`sm${sm}`]]: sm !== false,
    [(classes as Record<string, string>)[`md${md}`]]: md !== false,
    [(classes as Record<string, string>)[`lg${lg}`]]: lg !== false,
  });

  return <div className={className}>{children}</div>;
};

export default Grid;
