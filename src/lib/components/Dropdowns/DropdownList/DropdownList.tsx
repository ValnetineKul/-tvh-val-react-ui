import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import type { ChangeEvent, FC } from 'react';
import React, { cloneElement, isValidElement, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useScreenSize from '../../../hooks/useScreenSize';
import MenuList from '../../Menus/MenuList';
import Checkbox from '../../Checkbox';
import Divider from '../../Divider';
import InlineMessage from '../../InlineMessage';
import SearchField from '../../SearchField';
import Typography from '../../Typography';
import Surface from '../../Surfaces/Surface';
import useStyles from './DropdownList.styles';
import SpinnerWithBackdrop from '../../ProgressIndicators/Spinner/SpinnerWithBackdrop';
import Modal from '../../../patterns/Dialogs/Modal';
import type { DataAttributes } from '../../../types/common';
import VirtualizedList from '../../VirtualizedList';
import useDropdownHeightCalculator from './useDropdownHeightCalculator';
import type { MenuItemProps } from '../../Menus/MenuItem/MenuItem.types';
import {
  ACTION_BUTTON_MARGIN,
  DEFAULT_ITEM_HEIGHT,
  MAX_WINDOW_THRESHOLD,
  VIRTUALIZED_VISIBLE_ITEMS_COUNT,
  LARGE_ITEM_HEIGHT,
  LIST_CONTAINER_OFFSET,
  VIRTUALIZED_CONTAINER_PADDING,
} from './DropdownList.constants';

function getListItemHeight<T extends { props: MenuItemProps }[]>(items: T) {
  const itemData = React.Children.toArray(items) as T;

  return itemData[0].props.subLabel ? LARGE_ITEM_HEIGHT : DEFAULT_ITEM_HEIGHT;
}

export interface DropdownListProps {
  anchor?: HTMLElement | null;
  listItems: React.ReactElement[];
  header?: string | React.ReactNode;
  inlineMessage?: string;
  error?: React.ReactNode;
  actionItem?: React.ReactNode;
  searchPlaceholder?: string;
  searchAutoFocus?: boolean;
  checkboxLabel?: string;
  checked?: boolean;
  isLoading?: boolean;
  isVirtualized?: boolean;
  visibleItemsCount?: number;
  position?: 'bottom-end' | 'bottom-start' | 'bottom' | 'top-end' | 'top-start' | 'top';
  menuListClassName?: string;
  onClose: () => void;
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  searchFieldProps?: React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & DataAttributes;
  checkboxFieldProps?: React.HTMLAttributes<HTMLInputElement> & DataAttributes;
  clearButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

const DropdownList: FC<DropdownListProps> = ({
  anchor,
  listItems,
  header,
  inlineMessage,
  error,
  actionItem,
  searchPlaceholder,
  searchAutoFocus = false,
  checkboxLabel,
  checked,
  isLoading,
  isVirtualized = true,
  visibleItemsCount: visibleItemsCountProp,
  position,
  menuListClassName,
  onClose,
  onSearch,
  onCheckboxChange,
  searchFieldProps,
  clearButtonProps,
  checkboxFieldProps,
}) => {
  const [listHeight, setListHeight] = useState(0);
  const actionRef = React.useRef<HTMLDivElement>(null);

  const visibleItemsCount = visibleItemsCountProp || VIRTUALIZED_VISIBLE_ITEMS_COUNT;
  const {
    anchorPosition,
    listHeight: estimatedListHeight,
    maxListHeight,
    setListContainer,
  } = useDropdownHeightCalculator(
    anchor?.offsetParent as HTMLElement,
    actionRef.current,
    visibleItemsCount,
    listItems.length > 0 ? getListItemHeight(listItems) : 0,
    LIST_CONTAINER_OFFSET + (actionRef.current ? ACTION_BUTTON_MARGIN : 0)
  );
  const { classes, cx } = useStyles({ maxListHeight });

  const { isTabletUp } = useScreenSize('Tablet');
  const isMobile = !isTabletUp;

  const shouldShowMaxListItems =
    isTabletUp &&
    ((window.innerHeight <= MAX_WINDOW_THRESHOLD && !visibleItemsCountProp) ||
      (!!visibleItemsCountProp && estimatedListHeight > maxListHeight));

  const handleResize = (entries: ResizeObserverEntry[]) => {
    if (!isMobile || !isVirtualized) return;
    const entry = entries[0];
    let { height } = entry.contentRect;
    if (actionRef.current) height -= actionRef.current.clientHeight + ACTION_BUTTON_MARGIN;

    if (height && height !== listHeight && !isNaN(height)) setListHeight(height);
  };

  const resizeObserver = new ResizeObserver(handleResize);

  React.useEffect(() => {
    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line
  }, [isVirtualized, isMobile]);

  const onRefChange = React.useCallback(
    (listRef) => {
      if (!isMobile || !isVirtualized || !listRef) return;
      resizeObserver.observe(listRef);
    },
    // eslint-disable-next-line
    [isVirtualized, isMobile]
  );

  const handleCloseList = (event: MouseEvent | TouchEvent) => {
    if (anchor && anchor.contains(event.target as HTMLElement)) {
      return;
    }
    onClose();
  };

  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch && onSearch(e);
  };

  const renderHeader = () => {
    if (header) {
      return (
        <>
          <div className={classes.header}>
            {typeof header === 'string' ? <Typography variant="h4">{header}</Typography> : header}
          </div>
          <Divider />
        </>
      );
    }
    return null;
  };

  const renderMobileHeader = () => {
    if (header) {
      return (
        <>
          {typeof header === 'string' ? (
            <Typography variant="h5" className={classes.modalTitle} component="span">
              {header}
            </Typography>
          ) : (
            header
          )}
        </>
      );
    }
    return null;
  };

  const renderCheckbox = () => {
    if (onCheckboxChange && checkboxLabel) {
      return (
        <>
          <div className={classes.checkbox}>
            <Checkbox
              inputProps={checkboxFieldProps}
              onChange={onCheckboxChange}
              label={checkboxLabel}
              checked={checked}
              className={classes.checkboxLabel}
            />
          </div>
          {isMobile && !onSearch && <Divider />}
        </>
      );
    }
    return null;
  };

  const renderSearchField = () => {
    if (onSearch) {
      return (
        <div className={classes.search}>
          <SearchField
            searchFieldProps={searchFieldProps}
            deleteIconProps={clearButtonProps}
            fullWidth
            value={searchValue}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
            autoFocus={searchAutoFocus}
            variant="secondary"
          />
        </div>
      );
    }
    return null;
  };

  const renderItems = () => {
    if (error) {
      return <div className={classes.error}>{error}</div>;
    }

    if (listItems?.length > 0) {
      const listItemsWithKeys = listItems.map((item, key) =>
        isValidElement(item) ? cloneElement(item, { key }) : item
      );
      if (isVirtualized) {
        return (
          <VirtualizedList
            className={cx({
              [classes.virtualList]: shouldShowMaxListItems,
              [classes.virtualizedListWrapper]: !actionItem,
            })}
            listboxClassName={cx(classes.list, menuListClassName, {
              [classes.modalMenuList]: isMobile,
            })}
            visibleItemsCount={visibleItemsCount}
            containerPadding={VIRTUALIZED_CONTAINER_PADDING}
            mobileListheight={listHeight}
          >
            {listItemsWithKeys}
          </VirtualizedList>
        );
      }

      return (
        <MenuList
          className={cx(classes.list, { [classes.dynamicList]: shouldShowMaxListItems }, menuListClassName, {
            [classes.modalMenuList]: isMobile,
            [classes.listWrapper]: !actionItem,
          })}
        >
          {listItemsWithKeys}
        </MenuList>
      );
    }

    if (inlineMessage) {
      return <InlineMessage className={classes.message} message={inlineMessage} />;
    }

    return null;
  };

  const renderSpinnerWithBackdrop = () => {
    return (
      <SpinnerWithBackdrop
        ref={setListContainer}
        isBackdropOpaque={!listItems.length}
        className={cx(classes.fullSpinner, { [classes.modalScrollList]: isMobile })}
        size="lg"
        isLoading={isLoading}
      >
        {renderItems()}
      </SpinnerWithBackdrop>
    );
  };

  const renderActionItem = () => {
    if (actionItem) {
      return (
        <div ref={actionRef} className={cx(classes.actionItem, { [classes.modalActionItem]: isMobile })}>
          <Divider />
          {actionItem}
        </div>
      );
    }
    return null;
  };

  if (isTabletUp) {
    return (
      <ClickAwayListener onClickAway={handleCloseList}>
        <Popper
          className={classes.root}
          open={!!anchor}
          anchorEl={anchor}
          placement={position || (anchorPosition === 'top' ? 'bottom-end' : 'top-end')}
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 4],
              },
            },
          ]}
        >
          <Surface className={classes.surfaceRoot} color="100">
            {renderHeader()}
            {renderCheckbox()}
            {renderSearchField()}
            {renderSpinnerWithBackdrop()}
            {renderActionItem()}
          </Surface>
        </Popper>
      </ClickAwayListener>
    );
  }

  return (
    <Modal
      open={!!anchor}
      id={typeof header === 'string' ? header : uuidv4()}
      title={renderMobileHeader()}
      onClose={onClose}
      rootClassName={onSearch || isVirtualized ? classes.modalHeightWithSearch : classes.modalAutoHeight}
      containerClassName={classes.modalContainer}
      titleClassName={classes.title}
    >
      {renderCheckbox()}
      {renderSearchField()}
      <div ref={onRefChange} className={classes.modalContentWrapper}>
        {renderSpinnerWithBackdrop()}
        {renderActionItem()}
      </div>
    </Modal>
  );
};

export default DropdownList;
