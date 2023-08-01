import React, { useState, useMemo } from 'react';
import useScreenSize from '../../hooks/useScreenSize';
import Button from '../Buttons/Button';
import DropdownList from '../Dropdowns/DropdownList';
import Typography from '../Typography';
import { AngleDown } from '../Icon/icons/functional';
import Icon from '../Icon';
import MenuItem from '../Menus/MenuItem';
import useStyles from './ListOptionSelector.styles';
import Divider from '../Divider';
import type { DataAttributes } from '../../types/common';

type Value<T, Multiple> = Multiple extends true ? T[] : T;

interface ListOption<T = unknown> {
  label?: string;
  value: T;
  disabled?: boolean;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & DataAttributes;
  checkboxProps?: React.HTMLAttributes<HTMLInputElement> & DataAttributes;
}

const SelectAllOptionValue = 'select-all';

type SpecialOption = { value: string; label: string };

function isSelectAllOption(option: unknown): option is SpecialOption {
  return !!option && option === SelectAllOptionValue;
}

export interface ListOptionProps<T, Multiple> {
  label: string;
  selectAllLabel?: string;
  value: Value<T, Multiple>;
  options: ListOption<Value<T, false>>[];
  multiple?: Multiple;
  disabled?: boolean;
  onChange: (value: Value<T, false>) => void;
  onSelectAll?: (isAllSelected: boolean, values: Value<T, true>) => void;
  overrideMultiSelectLabel?: () => string;
  className?: string;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  isVirtualized?: boolean;
}

function ListOptionSelector<T, Multiple extends boolean | undefined = false>({
  label = '',
  selectAllLabel = 'Select all',
  value,
  options = [],
  multiple = false as never,
  disabled = false,
  onChange,
  onSelectAll,
  overrideMultiSelectLabel,
  className,
  buttonProps,
  isVirtualized = false,
}: ListOptionProps<T, Multiple>): JSX.Element {
  const { classes, cx } = useStyles();
  const { isTabletUp } = useScreenSize('Tablet');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const activeOptions = options.filter((option) => !option.disabled);
  const isEachOptionSelected = multiple && activeOptions.length === (value as Value<T, true>).length;

  const specialOptions = useMemo(() => {
    if (multiple && onSelectAll) {
      return [{ value: SelectAllOptionValue, label: selectAllLabel }, ...options] as ListOption<T>[];
    }
    return options;
  }, [options, multiple, onSelectAll, selectAllLabel]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    anchorEl ? handleClose() : setAnchorEl(event.currentTarget);
  };

  const handleChange = (newValue: Value<T, false>) => {
    onChange(newValue);
    handleClose();
  };

  const handleToggleSelectAll = () => {
    const allValues = activeOptions.map((option) => option.value);
    const selectedValuesCount = (value as Value<T, true>).length;

    if (selectedValuesCount === activeOptions.length) {
      onSelectAll?.(false, allValues);
    }

    if (selectedValuesCount >= 0 && selectedValuesCount < activeOptions.length) {
      onSelectAll?.(true, allValues);
    }
  };

  const handleMultipleChange = (newValue: Value<T, false>) => {
    if (onSelectAll && isSelectAllOption(newValue)) {
      handleToggleSelectAll();
    } else {
      onChange(newValue);
    }
  };

  const selectedOption = options.find((option) => option.value === value);

  const multiSelectOption = (() => {
    if (multiple && Array.isArray(value)) {
      return options.find((option) => option.value === value[0]);
    }
    return null;
  })();

  const multipleLabel = (() => {
    if (multiple && Array.isArray(value)) {
      if (overrideMultiSelectLabel) {
        return overrideMultiSelectLabel();
      }
      if (onSelectAll && isEachOptionSelected) {
        return 'All selected';
      }
      if (value.length === 0) {
        return 'Select a value';
      }
      if (value.length === 1) {
        return multiSelectOption?.label || `${multiSelectOption?.value as T}` || '';
      }
      return `${value.length} selected`;
    }
    return '';
  })();

  const listItems = specialOptions.map((option, index) => {
    const commonProps = {
      disabled: option.disabled || disabled,
    };
    if (multiple) {
      if (onSelectAll && isSelectAllOption(option.value)) {
        const isIndeterminate =
          (value as Value<T, true>).length !== 0 && activeOptions.length > (value as Value<T, true>).length;
        return (
          <li>
            <MenuItem
              {...commonProps}
              key={index}
              label={option.label || ''}
              checkbox
              checkboxProps={option.checkboxProps}
              selected={isEachOptionSelected}
              indeterminate={isIndeterminate}
              onCheckboxChange={() => handleMultipleChange(option.value)}
              elementType="div"
            />
            <Divider className={classes.dividerRoot} />
          </li>
        );
      }
      return (
        <MenuItem
          {...commonProps}
          key={index}
          label={option.label || `${option.value as T}` || ''}
          checkbox
          checkboxProps={option.checkboxProps}
          selected={Array.isArray(value) && value.includes(option.value)}
          onCheckboxChange={() => handleMultipleChange(option.value)}
        />
      );
    }

    return (
      <MenuItem
        {...commonProps}
        buttonProps={option.buttonProps}
        key={`${option.value as T}`}
        label={option.label || `${option.value as T}` || ''}
        selected={option.value === selectedOption?.value}
        onClick={() => {
          if (option.value === value) {
            return;
          }

          handleChange(option.value as T);
          handleClose();
        }}
      />
    );
  });

  const modalDropdownLabel = label.charAt(label.length - 1).match(/[a-z0-9]$/i) ? label : label.slice(0, -1);
  return (
    <div className={cx(classes.root, className)}>
      <Typography component="span" className={cx({ [classes.disabled]: disabled }, classes.label)}>
        {label}
      </Typography>
      <Button
        {...buttonProps}
        variant="link"
        linkType="primary"
        label={multiple ? multipleLabel : selectedOption?.label || `${selectedOption?.value as T}` || ''}
        endIcon={<Icon icon={AngleDown} size="sm" />}
        disabled={disabled}
        className={classes.value}
        onClick={handleClick}
      />
      {anchorEl && (
        <DropdownList
          listItems={listItems}
          anchor={anchorEl}
          onClose={handleClose}
          position="bottom-start"
          header={isTabletUp ? undefined : modalDropdownLabel}
          isVirtualized={isVirtualized}
        />
      )}
    </div>
  );
}

export default ListOptionSelector;
