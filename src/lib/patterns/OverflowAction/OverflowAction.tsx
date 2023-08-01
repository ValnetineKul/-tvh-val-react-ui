import type { ComponentProps } from 'react';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import DropdownMenu from '../../components/Dropdowns/DropdownMenu';
import { EllipsisH } from '../../components/Icon/icons/functional';
import Icon from '../../components/Icon';
import type { DataAttributes } from '../../types/common';
import useStyles from './OverflowAction.styles';

type DropdownMenuProps = ComponentProps<typeof DropdownMenu>;
type MenuItemElem = NonNullable<DropdownMenuProps['menuItems'][number]>;

export interface OverflowActionProps extends Omit<DropdownMenuProps, 'anchor' | 'onClose'> {
  closeMenuOnItemClick?: boolean;
  iconButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

export type Ref = {
  close: () => void;
  open: () => void;
  toggle: () => void;
};

const OverflowAction = forwardRef<Ref, OverflowActionProps>(
  ({ closeMenuOnItemClick = false, menuItems, ...props }, ref) => {
    const { classes, cx } = useStyles();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = useCallback(() => setIsOpen(false), []);
    const handleOpen = useCallback(() => setIsOpen(true), []);
    const handleToggle = useCallback(() => setIsOpen((val) => !val), []);

    const normalizedMenuItems = useMemo(() => {
      if (!closeMenuOnItemClick) return menuItems;

      function addOnClickToItem(item: MenuItemElem): MenuItemElem {
        if (!item) return item;
        const { subMenu, onClick } = item.props;
        if (Array.isArray(subMenu)) {
          return React.cloneElement(item, { subMenu: subMenu.map(addOnClickToItem) });
        }
        const handleItemClick = (...params: Parameters<NonNullable<typeof onClick>>) => {
          handleClose();
          onClick && onClick(...params);
        };
        return React.cloneElement(item, { onClick: handleItemClick });
      }

      return menuItems.map(addOnClickToItem);
    }, [closeMenuOnItemClick, handleClose, menuItems]);

    useImperativeHandle(
      ref,
      () => ({
        close: handleClose,
        open: handleOpen,
        toggle: handleToggle,
      }),
      [handleClose, handleOpen, handleToggle]
    );

    return (
      <>
        <IconButton
          icon={<Icon icon={EllipsisH} className={cx(isOpen && classes.activeIcon)} />}
          onClick={handleToggle}
          ref={setAnchorEl}
          {...props.iconButtonProps}
        />
        {isOpen && !!anchorEl && (
          <DropdownMenu anchor={anchorEl} menuItems={normalizedMenuItems} onClose={handleClose} {...props} />
        )}
      </>
    );
  }
);
OverflowAction.displayName = 'OverflowAction';

export default OverflowAction;
