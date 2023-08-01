import type { FC, ReactNode } from 'react';
import React from 'react';

import useStyles from './ListItem.styles';
import Icon from '../../../Icon';

export interface ListItemProps {
  children: ReactNode;
  icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
    }
  >;
  isOrdered?: boolean;
  className?: string;
}

const ListItem: FC<ListItemProps> = ({ children, icon, isOrdered = false, className }) => {
  const { classes, cx } = useStyles();
  const listStyleClassName = isOrdered ? classes.orderedRoot : classes.unorderedRoot;
  const rootClassName = cx(classes.root, !icon ? listStyleClassName : classes.iconRoot, className);

  const renderChildren = () => {
    if (!icon) return children;

    return (
      <>
        {icon && <Icon icon={icon} className={classes.icon} />}
        <div>{children}</div>
      </>
    );
  };

  return <li className={rootClassName}>{renderChildren()}</li>;
};

export default ListItem;
