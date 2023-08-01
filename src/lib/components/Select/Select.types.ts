import type React from 'react';
import type { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';
import type { AutocompleteValue, FilterOptionsState, PopperProps } from '@mui/material';
import type { DataAttributes } from '../../types/common';

export type Value<T, Multiple> = Multiple extends true ? T[] : T | null;
export type SpecialOption = { value: symbol; label: string };

export type CommonSelectProps<T, Multiple> = {
  options: (SpecialOption | T)[];
  isOpen: boolean;
  multiple: boolean;
  getOptionLabel: (value: T) => string;
  onOpen: () => void;
  onClose: (event: React.SyntheticEvent, reason: string) => void;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  getOptionDisabled?: (value: T) => boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: Value<T, Multiple>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedOptions: AutocompleteValue<T, Multiple, undefined, undefined>
  ) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  NoOptionsText?: React.ReactNode;
  renderOption: (
    props: React.HTMLAttributes<HTMLLIElement> & { 'data-option-index'?: string },
    option: T,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  popperProps?: Partial<PopperProps>;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => void;
  id?: string;
  className?: string;
  isLoading?: boolean;
  filterOptions: (items: (SpecialOption | T)[], state: FilterOptionsState<T>) => (SpecialOption | T)[];
  searchable?: boolean;
  required?: boolean;
  errorMessage?: string;
  helpText?: string;
  label?: string;
  placeholder?: string;
  getOptionStartIcon?: (option: T, params?: { isInTextArea?: boolean }) => React.ReactNode;
  isEachOptionSelected: boolean;
  onClear: () => void;
  startIcon?: React.ReactNode;
  clearable?: boolean;
  actionHelpText?: string;
  onActionHelpText?: () => void;
  freeSolo?: boolean;
  freeSoloCreatable?: boolean;
  autoHighlight?: boolean;
  inputValue?: string;
  autoSelect?: boolean;
  helpTextProps?: DataAttributes;
};
