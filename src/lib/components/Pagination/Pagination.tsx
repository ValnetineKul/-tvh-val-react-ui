import type { PaginationRenderItemParams } from '@mui/material/Pagination';
import { default as MuiPagination } from '@mui/material/Pagination';
import type { FC } from 'react';
import React from 'react';
import ListOptionSelector from '../ListOptionSelector';
import useStyles from './Pagination.styles';
import PaginationItem from './PaginationItem';
import type { DataAttributes } from '../../types/common';
import { useScreenSize } from '../../hooks';

export interface PaginationProps {
  page: number;
  numberOfPages: number;
  isNumberOfPagesUnknown?: boolean;
  itemsPerPage?: number | string;
  itemsPerPageLabel?: string;
  itemsPerPageOptions?: { label?: string; value: number | string }[];
  disabled?: boolean;
  onPageChange: (page: number, e?: React.ChangeEvent<unknown>) => void;
  onItemsPerPageChange?: (itemsPerPage: number | string) => void;
  perPageSelectorProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  pageButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  pageNextProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  pagePrevProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

const visiblePaginationItemsOnDesktop = 7;
const visiblePageItemsOnDesktop = 4;
const visiblePageItemsOnMobile = 3;

let shouldDeletePageAfterEllipsis = false;

const getPagePropsByType = (
  type: PaginationRenderItemParams['type'],
  props: Partial<Record<string, React.HTMLAttributes<HTMLButtonElement> & DataAttributes>>
) => {
  if (type === 'next') {
    return props.pageNextProps;
  }
  if (type === 'previous') {
    return props.pagePrevProps;
  }
  return props.pageButtonProps;
};

const Pagination: FC<PaginationProps> = ({
  page,
  numberOfPages,
  isNumberOfPagesUnknown,
  itemsPerPage,
  itemsPerPageLabel = '',
  onPageChange,
  onItemsPerPageChange,
  disabled = false,
  itemsPerPageOptions = [{ value: 10 }, { value: 25 }, { value: 50 }, { value: 100 }],
  perPageSelectorProps,
  pageButtonProps,
  pageNextProps,
  pagePrevProps,
}) => {
  const { classes } = useStyles();

  const { isTabletUp } = useScreenSize('Tablet');
  const siblingCount = isTabletUp ? 1 : 0;

  return (
    <div className={classes.root}>
      {itemsPerPage && onItemsPerPageChange ? (
        <ListOptionSelector
          label={itemsPerPageLabel}
          value={itemsPerPage}
          options={itemsPerPageOptions}
          className={classes.itemsPerPage}
          disabled={disabled}
          onChange={(v: number | string) => onItemsPerPageChange(v)}
          buttonProps={perPageSelectorProps}
        />
      ) : null}
      <MuiPagination
        count={numberOfPages}
        siblingCount={siblingCount}
        page={page}
        disabled={disabled}
        onChange={(e, newPage) => onPageChange(newPage, e)}
        classes={{ ul: classes.list }}
        renderItem={({ type, page: pageNumber, selected, disabled: isDisabled, onClick, ...prop }) => {
          if (type === 'first' || type === 'last') return null;
          const isLastPageElement = pageNumber === numberOfPages && type === 'page';
          const paginationItemsAhead = isTabletUp ? visiblePageItemsOnDesktop : visiblePageItemsOnMobile;
          const buttonProps =
            getPagePropsByType(type, {
              pageNextProps,
              pagePrevProps,
              pageButtonProps,
            }) || {};

          const shouldChangeLastItem = isNumberOfPagesUnknown && isLastPageElement;
          const shouldDeleteLastItem =
            shouldChangeLastItem &&
            numberOfPages - page >= paginationItemsAhead &&
            numberOfPages > visiblePaginationItemsOnDesktop;

          if (
            isNumberOfPagesUnknown &&
            isTabletUp &&
            pageNumber - page >= 2 &&
            numberOfPages >= visiblePaginationItemsOnDesktop
          ) {
            shouldDeletePageAfterEllipsis = true;
          }

          if (
            isNumberOfPagesUnknown &&
            isTabletUp &&
            numberOfPages === visiblePaginationItemsOnDesktop &&
            type === 'page' &&
            page > visiblePageItemsOnDesktop
          ) {
            if (pageNumber === 2) {
              return null;
            }

            if (pageNumber === 3) {
              return (
                <PaginationItem
                  type="start-ellipsis"
                  onClick={() => {}}
                  page={3}
                  selected={false}
                  disabled={isDisabled}
                  {...buttonProps}
                />
              );
            }
          }

          if (
            isNumberOfPagesUnknown &&
            isTabletUp &&
            numberOfPages - page === 1 &&
            numberOfPages >= visiblePaginationItemsOnDesktop &&
            pageNumber + 4 === numberOfPages
          ) {
            return null;
          }

          const PaginationItemEl = (
            <PaginationItem
              type={type}
              page={pageNumber}
              selected={selected}
              disabled={isDisabled}
              onClick={onClick}
              aria-label={(prop as unknown as Record<string, string>)['aria-label']}
              aria-current={(prop as unknown as Record<string, boolean>)['aria-current']}
              {...buttonProps}
            />
          );

          if (shouldChangeLastItem) {
            const paginationEl = !shouldDeletePageAfterEllipsis ? PaginationItemEl : null;
            if (shouldDeletePageAfterEllipsis) {
              shouldDeletePageAfterEllipsis = false;
            }
            return shouldDeleteLastItem ? null : (
              <>
                {paginationEl}
                <PaginationItem
                  type="end-ellipsis"
                  onClick={() => {}}
                  page={numberOfPages}
                  selected={false}
                  disabled={isDisabled}
                  {...buttonProps}
                />
              </>
            );
          }
          return PaginationItemEl;
        }}
      />
    </div>
  );
};

export default Pagination;
