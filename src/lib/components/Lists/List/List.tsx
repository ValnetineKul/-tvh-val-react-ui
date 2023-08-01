import type { FC } from 'react';
import React from 'react';

import Typography from '../../Typography';
import useStyles from './List.styles';

export interface ListProps {
  ordered?: boolean;
  className?: string;
}

const List: FC<ListProps> = ({ children, ordered = false, className }) => {
  const { classes, cx } = useStyles();
  const Tag = (ordered ? 'ol' : 'ul') as keyof JSX.IntrinsicElements;

  const rootClassName = cx(classes.root, className, {
    [classes.orderedList]: ordered,
    [classes.unorderedList]: !ordered,
  });

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) return React.cloneElement<ListProps>(child, { ordered });
    return null;
  });

  return (
    <Typography component={Tag} className={rootClassName}>
      {childrenWithProps}
    </Typography>
  );
};

export default List;
