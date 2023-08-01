import type { FC, ReactNode } from 'react';
import React from 'react';

import useStyles from './ChipGroup.styles';

export interface ChipGroupProps {
  children: ReactNode;
  fillContent?: boolean;
  className?: string;
}

const ChipGroup: FC<ChipGroupProps> = ({ children, fillContent = false, className }) => {
  const { classes, cx } = useStyles();

  const rootClassName = cx(classes.root, className, {
    [classes.fillContent]: fillContent,
  });

  return (
    <ul className={rootClassName}>
      {children &&
        React.Children.map(children, (child, key) => {
          if (fillContent) {
            return <li key={key}>{React.cloneElement(child as React.ReactElement, { fullWidth: true })}</li>;
          }
          return <li key={key}>{child}</li>;
        })}
    </ul>
  );
};

export default ChipGroup;
