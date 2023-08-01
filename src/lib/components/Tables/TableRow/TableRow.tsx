import React from 'react';
import { default as MuiTableRow } from '@mui/material/TableRow';
import type { DataAttributes } from '../../../types/common';
import filterEvents from '../../../helpers/filterEvents';
import Button from '../../Buttons/Button';
import ButtonBase from '../../Surfaces/ButtonBase';
import type { ButtonBaseProps } from '../../ButtonBase';
import { useButtonBase } from '../../ButtonBase';
import IconButton from '../../Buttons/IconButton';
import Icon from '../../Icon';
import { AngleDown, AngleUp, Pen } from '../../Icon/icons/functional';
import Collapse from '../../Collapse';
import TableCell from '../TableCell';
import useStyles from './TableRow.styles';

interface CommonProps extends ButtonBaseProps {
  hover?: boolean;
  selected?: boolean;
  clickable?: boolean;
  expandableContent?: React.ReactNode;
  className?: string;
  onRowClick?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent> | React.KeyboardEvent<HTMLTableRowElement>
  ) => void;
  shouldBeExpanded?: boolean;
  onExpand?: () => void;
  hasEditingRow?: boolean;
  isAnyRowEditing?: boolean;
  setIsAnyRowEditing?: (isEditing: boolean) => void;
  children?: React.ReactNode;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & DataAttributes;
  tableRowProps?: React.HTMLAttributes<HTMLTableRowElement> & DataAttributes;
}

interface NoAction {
  onEditSave?: never;
}

interface Editable<T> {
  editColumnClassName?: string;
  editLabel?: string;
  saveLabel?: string;
  cancelLabel?: string;
  rowData: T;
  onEditSave: (value: T) => void;
  onEdit?: () => void;
}

export type TableRowProps<T> = CommonProps & (NoAction | Editable<T>);

function TableRow<T>({
  children,
  hover = false,
  selected = false,
  clickable = false,
  expandableContent,
  className,
  onRowClick,
  shouldBeExpanded = false,
  onExpand,
  hasEditingRow,
  isAnyRowEditing,
  setIsAnyRowEditing,
  tableRowProps,
  ...props
}: TableRowProps<T>): JSX.Element {
  const { classes, cx } = useStyles();

  const onEdit = 'onEdit' in props && props.onEdit;
  const onEditSave = 'onEditSave' in props && props.onEditSave;
  const rowData = 'rowData' in props ? props.rowData : undefined;
  const editColumnClassName = 'editColumnClassName' in props && props.editColumnClassName;
  const editLabel = 'editLabel' in props && props.editLabel ? props.editLabel : 'Edit';
  const saveLabel = 'saveLabel' in props && props.saveLabel ? props.saveLabel : 'Save';
  const cancelLabel = 'cancelLabel' in props && props.cancelLabel ? props.cancelLabel : 'Cancel';
  const isEditable: boolean = !!onEditSave && !!rowData;

  const buttonBaseProps = useButtonBase(props);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isEditActive, setIsEditActive] = React.useState(false);
  const [dataModel, setDataModel] = React.useState(rowData);

  const ref = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  let rowEvent: React.MouseEvent<HTMLTableRowElement, MouseEvent> | React.KeyboardEvent<HTMLTableRowElement>;

  const handleRowClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent> | React.KeyboardEvent<HTMLTableRowElement>
  ) => {
    if (clickable) {
      const [isTabableElement, isDescendentOfTabableElements, isElementOutsideDomTree] = filterEvents(event);

      if (!ref.current || isTabableElement || isDescendentOfTabableElements || isElementOutsideDomTree) {
        return;
      }

      rowEvent = event;
      ref.current.click();
    }
  };

  const handleButtonBaseClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.stopPropagation();
    onRowClick && onRowClick(rowEvent);
  };

  const toggleEdit = (isEdit: boolean) => {
    if (isEdit) {
      setDataModel(rowData);
    }

    setIsEditActive(isEdit);
    if (setIsAnyRowEditing) setIsAnyRowEditing(isEdit);
  };

  const handleEdit = (key: keyof T, value?: string | number) => {
    if (dataModel) setDataModel({ ...dataModel, [key]: value });
  };

  const checkChildrenValid = () => {
    let isValid = true;

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.errorMessage) isValid = false;
    });

    return isValid;
  };

  const handleOnEditClick = () => {
    if (onEdit) {
      onEdit();
    }

    toggleEdit(true);
  };

  const handleSave = () => {
    if (!checkChildrenValid()) return;
    toggleEdit(false);
    if (onEditSave && dataModel) onEditSave(dataModel);
  };

  const renderEditable = () => {
    return !isEditActive ? (
      <Button
        disabled={isAnyRowEditing}
        startIcon={<Icon icon={Pen} />}
        label={editLabel}
        onClick={handleOnEditClick}
        size="sm"
        variant="tertiary"
      />
    ) : (
      <div className={classes.editActionsRoot}>
        <Button label={saveLabel} onClick={handleSave} size="sm" />
        <Button label={cancelLabel} onClick={() => toggleEdit(false)} variant="tertiary" size="sm" />
      </div>
    );
  };

  const renderEditableChildren = () => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      return React.cloneElement(child, { isEditActive, rowData: dataModel, onEdit: handleEdit });
    });
  };

  return (
    <>
      <MuiTableRow
        hover={hover}
        selected={selected || isEditActive}
        tabIndex={clickable ? 0 : undefined}
        classes={{ root: classes.root, hover: classes.hover, selected: classes.selected }}
        className={cx({ [classes.row]: clickable }, className)}
        onClick={handleRowClick}
        onKeyPress={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleRowClick(event);
          }
        }}
        {...tableRowProps}
      >
        {clickable && (
          <TableCell className={classes.visuallyHidden}>
            <ButtonBase {...buttonBaseProps} ref={ref} color="100" tabIndex={-1} onClick={handleButtonBaseClick} />
          </TableCell>
        )}
        {expandableContent && (
          <TableCell className={classes.expandableCell}>
            <IconButton
              icon={<Icon icon={isExpanded || shouldBeExpanded ? AngleUp : AngleDown} />}
              onClick={() => {
                if (onExpand) {
                  onExpand();
                } else {
                  setIsExpanded(!isExpanded);
                }
              }}
              {...props.buttonProps}
            />
          </TableCell>
        )}
        {isEditable ? (
          <>
            {renderEditableChildren()}
            <TableCell className={cx(classes.editActionCol, editColumnClassName)}>{renderEditable()}</TableCell>
          </>
        ) : (
          children
        )}
        {hasEditingRow && (
          <TableCell>
            <span className={classes.visuallyHidden}>Edit actions</span>
          </TableCell>
        )}
      </MuiTableRow>
      {expandableContent && (
        <MuiTableRow>
          <TableCell
            hasInnerContainer={false}
            colSpan={100}
            className={cx(classes.expandableContentCell, {
              [classes.notExpandedContentCell]: !isExpanded,
            })}
          >
            <Collapse open={shouldBeExpanded || isExpanded}>{expandableContent}</Collapse>
          </TableCell>
        </MuiTableRow>
      )}
    </>
  );
}

export default TableRow;
