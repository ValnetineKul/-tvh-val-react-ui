import type { FC, MouseEventHandler } from 'react';
import React from 'react';
import IconButton from '../../Buttons/IconButton';
import Icon from '../../Icon';
import { AngleLeft, AngleRight } from '../../Icon/icons/functional';

export interface TabNavigationScrollButtonProps {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const TabNavigationScrollButton: FC<TabNavigationScrollButtonProps> = (props) => {
  const { direction, ...restProps } = props;

  if (direction === 'left') {
    return <IconButton {...restProps} size="sm" focus="inset" icon={<Icon icon={AngleLeft} />} />;
  }

  return <IconButton {...restProps} size="sm" focus="inset" icon={<Icon icon={AngleRight} />} />;
};

export default TabNavigationScrollButton;
