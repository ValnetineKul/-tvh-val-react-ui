import type { FC } from 'react';
import React, { useRef } from 'react';
import type { InputBaseComponentProps } from '@mui/material/InputBase';
import { capitalize } from '@mui/material/utils';
import TextField from '../TextField';
import { Search, Times } from '../Icon/icons/functional';
import Icon from '../Icon';
import IconButton from '../Buttons/IconButton';
import PrimarySearchButton from './PrimarySearchButton';
import type { DataAttributes } from '../../types/common';
import useStyles from './SearchField.styles';

interface CommonProps {
  id?: string;
  placeholder?: string;
  value?: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEnter?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => void;
  onClear?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onSearch?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  containerClassName?: string;
  name?: string;
  searchFieldProps?: InputBaseComponentProps & DataAttributes;
  deleteIconProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

interface PrimarySearchField {
  variant?: 'primary';
  size?: 'xs' | 'sm';
  searchButtonLabel?: string;
  searchButtonVariant?: 'primary' | 'secondary';
}

interface SecondarySearchField {
  variant?: 'secondary';
  size?: never;
  searchButtonLabel?: never;
  searchButtonVariant?: never;
}

export type SearchFieldProps = CommonProps & (PrimarySearchField | SecondarySearchField);

const SearchField: FC<SearchFieldProps> = ({
  value,
  onChange,
  onFocus,
  variant = 'primary',
  onEnter,
  onClear,
  onSearch,
  className,
  containerClassName,
  searchFieldProps,
  deleteIconProps,
  fullWidth = false,
  size,
  searchButtonLabel,
  searchButtonVariant,
  ...props
}) => {
  const primarySearchFieldSize = variant === 'primary' && size ? size : 'sm';

  const inputRef = useRef<HTMLInputElement>(null);

  const { cx, classes } = useStyles();

  const variantClassName = (classes as Record<string, string>)[`variant${capitalize(variant)}`];
  const variantFilledClassName = (classes as Record<string, string>)[`variant${capitalize(variant)}Filled`];
  const inputFilledClassName = (classes as Record<string, string>)[`input${capitalize(variant)}Filled`];

  const handleClearIconClick = () => {
    if (inputRef.current) {
      const input = inputRef.current.querySelector('input');
      const inputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      inputValueSetter?.call(input, '');
      const event = new Event('input', { bubbles: true });
      input?.dispatchEvent(event);
      if (onClear) {
        onClear();
      }
    }
  };

  const handleSearchIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onSearch) onSearch(e);
  };

  return (
    <div className={cx(classes.root, containerClassName)}>
      <TextField
        {...props}
        type="search"
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        endIcon={
          <div className={classes.adornedEnd}>
            {!!value && (
              <IconButton
                {...deleteIconProps}
                aria-label="Clear button"
                onClick={handleClearIconClick}
                icon={<Icon icon={Times} />}
              />
            )}
            {variant === 'secondary' && (
              <IconButton
                type="submit"
                icon={<Icon icon={Search} />}
                onClick={handleSearchIconClick}
                className={classes.secondarySearchButton}
              />
            )}
          </div>
        }
        inputRef={inputRef}
        className={cx({ [classes.fullWidth]: fullWidth && variant === 'primary' }, className)}
        inputClassName={cx(classes.input, { [inputFilledClassName]: !!value })}
        inputElementClassName={cx(classes.inputElement, value ? variantFilledClassName : variantClassName, {
          [classes.inputElementPrimaryXs]: primarySearchFieldSize === 'xs',
        })}
        inputProps={{ onFocus, ...searchFieldProps }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter && onEnter(e);
          }
        }}
      />
      {variant === 'primary' && (
        <PrimarySearchButton
          className={cx(classes.primaryButton, { [classes.primaryButtonSm]: primarySearchFieldSize === 'sm' })}
          label={searchButtonLabel}
          size={primarySearchFieldSize}
          variant={searchButtonVariant}
          onClick={handleSearchIconClick}
        />
      )}
    </div>
  );
};

export default SearchField;
