import type { ElementType, Ref } from 'react';
import React, { forwardRef } from 'react';
import type { TableCellBaseProps } from '@mui/material/TableCell';
import { default as MuiTableCell } from '@mui/material/TableCell';
import useStyles from './TableCell.styles';
import { ArrowDown, ArrowDownArrowUp, ArrowUp } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import ButtonBase from '../../Surfaces/ButtonBase';
import TextField from '../../TextField';
import NumberField from '../../NumberField';

interface CommonProps {
  numeric?: boolean;
  colSpan?: number;
  className?: string;
  component?: ElementType<TableCellBaseProps>;
  children?: React.ReactNode;
  hasInnerContainer?: boolean;
}

interface NoAction {
  onSortClick?: never;
  onEdit?: never;
}

interface Sortable {
  sortProperty: string;
  sortBy: string | null;
  sortDirection: 'asc' | 'desc';
  onSortClick: (by: string | null, direction: 'asc' | 'desc') => void;
}

interface Editable<T> {
  isEditActive?: boolean;
  editProperty?: string;
  editColWidth?: string;
  errorMessage?: string;
  rowData: T;
  onEdit: (key: string, value?: string | number) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export type TableCellProps<T> = CommonProps & (NoAction | Editable<T> | Sortable);

const TableCell = forwardRef(
  <T,>(
    { children, numeric = false, colSpan, className, component, hasInnerContainer = true, ...props }: TableCellProps<T>,
    ref: Ref<HTMLTableCellElement>
  ) => {
    const { classes, cx } = useStyles();
    const sortProperty = 'sortProperty' in props && props.sortProperty;
    const sortBy = 'sortBy' in props && props.sortBy;
    const sortDirection = 'sortDirection' in props && props.sortDirection;
    const onSortClick = 'onSortClick' in props && props.onSortClick;

    const isSortable = sortProperty && sortDirection && onSortClick;
    const isSortActive = sortProperty === sortBy;

    const onEdit = 'onEdit' in props ? props.onEdit : undefined;
    const onBlur = 'onBlur' in props ? props.onBlur : undefined;
    const isEditActive = 'isEditActive' in props && props.isEditActive;
    const editProperty = 'editProperty' in props && props.editProperty;
    const editColWidth = 'editColWidth' in props ? props.editColWidth : undefined;
    const rowData = 'rowData' in props ? props.rowData : undefined;
    const errorMessage = 'errorMessage' in props ? props.errorMessage : undefined;

    const isEditable = editProperty && isEditActive && rowData;

    const handleSort = () => {
      if (!sortProperty || !onSortClick) return;

      if (!isSortActive) {
        onSortClick(sortProperty, 'asc');
        return;
      }

      if (sortDirection === 'desc') {
        onSortClick(null, 'asc');
        return;
      }

      onSortClick(sortProperty, 'desc');
    };

    const renderSortIcon = () => {
      return isSortActive ? (
        <Icon icon={sortDirection === 'asc' ? ArrowUp : ArrowDown} size="sm" />
      ) : (
        <Icon className={classes.sortInactiveIcon} icon={ArrowDownArrowUp} size="sm" />
      );
    };

    const renderSortable = () => {
      return (
        <ButtonBase
          color="200"
          focus="inset"
          onClick={handleSort}
          className={cx(classes.sortContainer, { [classes.sortContainerNumeric]: numeric })}
        >
          {children}
          {renderSortIcon()}
        </ButtonBase>
      );
    };

    const handleEdit = (value?: string | number) => {
      if (!onEdit || !editProperty) return;

      onEdit(editProperty, value);
    };

    const renderEditable = () => {
      if (!editProperty || !rowData) return;

      if (numeric) {
        return (
          <NumberField
            errorMessage={errorMessage}
            inputClassName={classes.editField}
            onBlur={onBlur}
            onChange={handleEdit}
            value={rowData[editProperty as keyof T] as unknown as number}
          />
        );
      }

      return (
        <TextField
          errorMessage={errorMessage}
          inputClassName={classes.editField}
          onBlur={onBlur}
          onChange={(event) => handleEdit(event.target.value)}
          value={rowData[editProperty as keyof T] as unknown as string}
        />
      );
    };

    const renderChildren = () => {
      if (isSortable) return renderSortable();

      if (isEditable) return renderEditable();

      return children;
    };

    return (
      <MuiTableCell
        align={numeric ? 'right' : 'left'}
        classes={{ head: classes.head, stickyHeader: classes.stickyHeader, body: classes.body }}
        colSpan={colSpan}
        component={component}
        className={cx(classes.root, className, {
          [classes.sortRoot]: !!isSortable,
        })}
        width={editColWidth}
        ref={ref}
      >
        {hasInnerContainer ? (
          <div className={cx(classes.innerRoot, { [classes.innerRootNumeric]: numeric })}>{renderChildren()}</div>
        ) : (
          renderChildren()
        )}
      </MuiTableCell>
    );
  }
);
export default TableCell;
