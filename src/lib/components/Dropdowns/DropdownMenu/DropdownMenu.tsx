import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';

import type { FC } from 'react';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useScreenSize from '../../../hooks/useScreenSize';
import Surface from '../../Surfaces/Surface';
import MenuItem from '../../Menus/MenuItem';
import MenuList from '../../Menus/MenuList';
import Spinner from '../../ProgressIndicators/Spinner';
import SpinnerWithBackdrop from '../../ProgressIndicators/Spinner/SpinnerWithBackdrop';
import Modal from '../../../patterns/Dialogs/Modal';
import Typography from '../../Typography';
import { AngleLeft, Times } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import IconButton from '../../Buttons/IconButton';
import { useComponentCountController } from '../../../hooks/useComponentCounterHooks/useComponentCounterHooks';
import type { MenuItemProps } from '../../Menus/MenuItem/MenuItem.types';
import useDropdownHeightCalculator from '../DropdownList/useDropdownHeightCalculator';
import useStyles from './DropdownMenu.styles';
import {
  DEFAULT_VISIBLE_ITEMS_COUNT,
  LARGE_ITEM_HEIGHT,
  DEFAULT_ITEM_HEIGHT,
} from '../DropdownList/DropdownList.constants';

const LIST_CONTAINER_OFFSET = 40;

function getMenuItemHeight<T extends { props: MenuItemProps }[]>(items: T) {
  const itemData = React.Children.toArray(items) as T;

  return itemData[0].props.subLabel ? LARGE_ITEM_HEIGHT : DEFAULT_ITEM_HEIGHT;
}

export interface DropdownMenuProps {
  anchor?: HTMLElement | null;
  menuItems: (React.ReactElement<React.ComponentProps<typeof MenuItem>> | null)[];
  visibleItemsCount?: number;
  position?: 'bottom-end' | 'bottom-start' | 'bottom' | 'top-end' | 'top-start' | 'top';
  onClose: () => void;
  isLoading?: boolean;
  isSubMenuLoading?: boolean;
  mobileMenuTitle?: string;
  menuListClassName?: string;
  modalClassName?: string;
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  anchor,
  menuItems,
  visibleItemsCount: visibleItemsCountProp,
  position = 'bottom-start',
  onClose,
  isLoading = false,
  isSubMenuLoading = false,
  mobileMenuTitle = 'Dropdown header',
  menuListClassName,
  modalClassName,
}) => {
  const visibleItemsCount = visibleItemsCountProp || DEFAULT_VISIBLE_ITEMS_COUNT;
  const {
    anchorPosition,
    listHeight: estimatedListHeight,
    maxListHeight,
    setListContainer,
  } = useDropdownHeightCalculator(
    anchor,
    null,
    visibleItemsCount,
    menuItems.length > 0 ? getMenuItemHeight(menuItems) : 0,
    LIST_CONTAINER_OFFSET
  );
  const { classes, cx } = useStyles({
    maxListHeight: !!visibleItemsCountProp && estimatedListHeight < maxListHeight ? estimatedListHeight : maxListHeight,
  });
  const { isTabletUp } = useScreenSize('Tablet');

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [subMenuAnchor, setSubMenuAnchor] = useState<null | HTMLElement>(null);

  const shouldShowMaxListItems = isTabletUp;

  const toggleSubMenu = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    setIsSubMenuOpen(!isSubMenuOpen);
    setSubMenuAnchor(event.currentTarget);
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLLIElement>) => {
    setIsSubMenuOpen(true);
    setSubMenuAnchor(event.currentTarget);
  };

  const handleCloseList = (event: MouseEvent | TouchEvent) => {
    if (anchor && anchor.contains(event.target as HTMLElement)) {
      return;
    }
    onClose();
  };

  const renderModalTitle = () => {
    return (
      <>
        {typeof mobileMenuTitle === 'string' ? (
          <Typography variant="h5" className={classes.modalTitle} component="span">
            {mobileMenuTitle}
          </Typography>
        ) : (
          mobileMenuTitle
        )}
      </>
    );
  };

  const renderList = () => {
    if (isLoading && menuItems.length === 0) {
      return (
        <li
          className={
            isTabletUp
              ? classes.emptySpinnerContainer
              : cx(classes.mobileEmptySpinnerContainer, classes.emptySpinnerContainer)
          }
        >
          <Spinner />
        </li>
      );
    }

    return menuItems.map((item, key) => {
      if (!item) {
        return null;
      }

      const { label, disabled: isDisabled, subMenu } = item.props;

      if (subMenu) {
        const renderSubMenu = (sublevelLabel: string | JSX.Element) => {
          const renderSubMenuList = () => {
            return (
              <MenuList className={isTabletUp ? classes.menuList : classes.mobileMenuList}>
                {subMenu?.map((subMenuItem, index) => React.cloneElement(subMenuItem, { key: index }))}
              </MenuList>
            );
          };

          const renderSubModalTitle = () => {
            return (
              <div className={classes.mobileSubMenu}>
                <IconButton
                  aria-label="back"
                  size="md"
                  onClick={() => setIsSubMenuOpen(false)}
                  icon={<Icon icon={AngleLeft} />}
                />
                {typeof sublevelLabel === 'string' ? (
                  <Typography variant="h5" component="span" className={classes.modalLabel}>
                    {sublevelLabel}
                  </Typography>
                ) : (
                  sublevelLabel
                )}
                <IconButton
                  aria-label="close"
                  size="md"
                  onClick={() => setIsSubMenuOpen(false)}
                  icon={<Icon icon={Times} />}
                />
              </div>
            );
          };

          if (isTabletUp) {
            return (
              <Popper
                open={!isDisabled && !!anchor && isSubMenuOpen}
                anchorEl={subMenuAnchor}
                className={cx(classes.menu, classes.subMenu)}
                placement="left-start"
              >
                <Surface color="100">{renderSubMenuList()}</Surface>
              </Popper>
            );
          }
          return (
            <Modal
              open={isSubMenuOpen}
              id={typeof sublevelLabel === 'string' ? sublevelLabel : uuidv4()}
              title={renderSubModalTitle()}
              rootClassName={classes.modalAutoHeight}
              containerClassName={classes.modalContainer}
              titleClassName={classes.title}
            >
              <SpinnerWithBackdrop
                className={cx(classes.fullSpinner, classes.modalScrollList)}
                isLoading={isSubMenuLoading && menuItems.length > 0}
              >
                {renderSubMenuList()}
              </SpinnerWithBackdrop>
            </Modal>
          );
        };

        // exclude checkbox specific props
        const {
          onCheckboxChange,
          checkboxProps,
          checkbox: hasCheckbox,
          indeterminate: isIndeterminate,
          ...props
        } = item.props;

        return (
          // workaround because of Nested Menu component is planned to be developed: https://material-ui.com/discover-more/roadmap/#main-content
          // keyboard navigation for submenu does not work
          // TODO: improve subMenu (desktop and mobile version) to make it semantical and accessible
          /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
          <li
            key={key}
            onMouseEnter={isTabletUp ? handleMouseOver : undefined}
            onClick={isTabletUp ? handleMouseOver : undefined}
            onKeyUp={isTabletUp ? () => handleMouseOver : undefined}
            onMouseLeave={isTabletUp ? () => setIsSubMenuOpen(false) : undefined}
          >
            <MenuItem {...props} label={label} elementType="div" disabled={isDisabled} onClick={toggleSubMenu} />
            {renderSubMenu(label)}
          </li>
          /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
        );
      }

      return React.cloneElement(item, { key });
    });
  };

  const renderSpinnerWithBackdrop = () => {
    return (
      <SpinnerWithBackdrop
        ref={setListContainer}
        className={cx(classes.fullSpinner, { [classes.modalScrollList]: !isTabletUp })}
        isLoading={isLoading && menuItems.length > 0}
      >
        <MenuList
          className={
            isTabletUp
              ? cx(classes.menu, classes.menuList, { [classes.dynamicList]: shouldShowMaxListItems }, menuListClassName)
              : classes.mobileMenuList
          }
        >
          {renderList()}
        </MenuList>
      </SpinnerWithBackdrop>
    );
  };

  useComponentCountController('DropdownMenu:mobile', !isTabletUp && !!anchor);

  if (isTabletUp) {
    return (
      <ClickAwayListener onClickAway={handleCloseList}>
        <Popper
          className={classes.popperRoot}
          open={!!anchor}
          anchorEl={anchor}
          placement={position || (anchorPosition === 'top' ? 'bottom-end' : 'top-end')}
        >
          <Surface color="100" className={classes.mainSurface}>
            {renderSpinnerWithBackdrop()}
          </Surface>
        </Popper>
      </ClickAwayListener>
    );
  }

  return (
    <Modal
      open={!!anchor}
      id={typeof mobileMenuTitle === 'string' ? mobileMenuTitle : uuidv4()}
      title={renderModalTitle()}
      onClose={onClose}
      rootClassName={cx(
        classes.modalAutoHeight,
        { [classes.hiddenContentFromScreenReader]: isSubMenuOpen },
        modalClassName
      )}
      containerClassName={classes.modalContainer}
      titleClassName={classes.title}
    >
      {renderSpinnerWithBackdrop()}
    </Modal>
  );
};

export default DropdownMenu;
