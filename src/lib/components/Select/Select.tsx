import React, { useMemo, useState, useRef, useEffect } from 'react';
import type { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';
import type { AutocompleteValue } from '@mui/material/useAutocomplete';
import type { FilterOptionsState, PopperProps, InputBaseComponentProps } from '@mui/material';
import useScreenSize from '../../hooks/useScreenSize';
import Typography from '../Typography';
import Divider from '../Divider';
import MenuItem from '../Menus/MenuItem';
import DropdownAction from '../Dropdowns/DropdownAction';
import Button from '../Buttons/Button';
import Autocomplete from './Autocomplete';
import Modal from '../../patterns/Dialogs/Modal';
import TextField from '../TextField';
import StartAdornment from './StartAdornment';
import EndAdornment from './EndAdornment';
import useStyles from './Select.styles';
import Icon from '../Icon';
import { Search } from '../Icon/icons/functional';
import type { DataAttributes } from '../../types/common';
import { useComponentCountController } from '../../hooks/useComponentCounterHooks/useComponentCounterHooks';

// if we use just Symbol without .for, jest for some reason has issues
const SelectAllOptionValue = Symbol.for('select-all');
const TitleOptionValue = Symbol.for('title');
export const FreeSoloCreatableOptionValue = Symbol.for('free-solo-creatable');

type SpecialOption = {
  value: symbol;
  label: string;
  inputVal?: string;
};

function isSelectAllOption(option: unknown): option is SpecialOption {
  return !!option && typeof option === 'object' && (option as SpecialOption).value === SelectAllOptionValue;
}

function isTitleOption(option: unknown): option is SpecialOption {
  return !!option && typeof option === 'object' && (option as SpecialOption).value === TitleOptionValue;
}

export function isFreeSoloCreatableOption(option: unknown): option is SpecialOption {
  return !!option && typeof option === 'object' && (option as SpecialOption).value === FreeSoloCreatableOptionValue;
}

function isSpecialOption(option: unknown): boolean {
  return !!option && typeof option === 'object' && typeof (option as SpecialOption).value === 'symbol';
}

type Value<T, Multiple> = Multiple extends true ? T[] : T | null;

function sortAlphabeticallyAscending(a: string, b: string): number {
  return a.localeCompare(b);
}

export interface SelectProps<
  T extends FreeSolo extends true ? string : unknown,
  Multiple extends boolean = false,
  FreeSolo extends boolean = false,
  FreeSoloCreatable extends boolean = false
> {
  label: string;
  id?: string;
  placeholder?: string;
  multiple?: Multiple;
  selectAllLabel?: string;
  value?: Value<T, Multiple>;
  getOptionLabel: (value: T) => string;
  getOptionStartIcon?: (option: T, params?: { isInTextArea?: boolean }) => React.ReactNode;
  NoOptionsText?: React.ReactNode;
  getOptionDisabled?: (value: T) => boolean;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  errorMessage?: string;
  helpText?: string;
  actionHelpText?: string;
  helpTextProps?: DataAttributes;
  onActionHelpText?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  freeSolo?: FreeSolo;
  freeSoloCreatable?: FreeSoloCreatable;
  isFreeSoloSearchInput?: boolean;
  onChange: (
    // MUI Autocomplete has lack of type definition for onChange
    // eslint-disable-next-line @typescript-eslint/ban-types
    event: React.ChangeEvent<{}> | null,
    // MUIValue is used as a workaround to make types correct
    value: AutocompleteValue<T, Multiple, undefined, FreeSolo>
  ) => void;
  onInputChange?: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLDivElement>;
  inputElementRef?: React.Ref<HTMLInputElement>;
  options: T[] | Record<string, T[]>;
  startIcon?: React.ReactNode;
  onSelectAll?: (value: boolean) => void;
  onToggleOption?: (value: T[]) => void;
  className?: string;
  renderOption?:
    | ((
        props: React.HTMLAttributes<HTMLLIElement>,
        option: FreeSoloCreatable extends true ? T | SpecialOption : T,
        state: AutocompleteRenderOptionState
      ) => React.ReactNode)
    | undefined;
  popperProps?: Partial<PopperProps>;
  infoMessage?: string;
  modalActionItemLabel?: string;
  autoHighlight?: boolean;
  // used when you want the first option to be highlighted only after you type something in the textfield
  // can be used togheter with autoSelect
  autoHighlightWhenFilled?: boolean;
  inputValue?: string;
  // "freeSolo + autoSelect" combination can unexpectedly change field value
  // There are open mui bugs: https://github.com/mui/material-ui/issues/20602 and https://github.com/mui/material-ui/issues/27962
  // Don't use combination "freeSolo + autoSelect + autoHighlight". If it is possible, please use
  // "freeSolo + autoSelect" OR "freeSolo + autoHighlight". It is a recomindation from mui developer: https://github.com/mui/material-ui/issues/18646
  autoSelect?: boolean;
  // "isVirtualized + autoHighlight" combination will trigger an unexpected scroll in the list
  // Using "autoHighlight" will disable isVirtualized automatically
  isVirtualized?: boolean;
  optionProps?: React.HTMLAttributes<HTMLElement> & DataAttributes;
  inputProps?: InputBaseComponentProps & DataAttributes;
  deleteIconProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  findByAllParams?: string[];
  toggleButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

export default function Select<
  T extends FreeSolo extends true ? string : unknown,
  Multiple extends boolean = false,
  FreeSolo extends boolean = false,
  FreeSoloCreatable extends boolean = false
>({
  disabled,
  readOnly,
  placeholder,
  multiple = false as never,
  selectAllLabel = 'Select all',
  fullWidth,
  required,
  clearable = true,
  searchable = true,
  loading = false,
  freeSolo = false as never,
  freeSoloCreatable = false as never,
  isFreeSoloSearchInput = false,
  NoOptionsText = 'No results',
  options,
  value,
  getOptionLabel,
  getOptionStartIcon,
  getOptionDisabled,
  isOptionEqualToValue,
  onChange,
  onInputChange,
  onBlur,
  onFocus,
  label,
  inputRef,
  inputElementRef,
  startIcon,
  errorMessage,
  helpText,
  helpTextProps,
  onSelectAll,
  onToggleOption,
  className,
  renderOption: renderOptionProp,
  popperProps,
  infoMessage,
  actionHelpText,
  onActionHelpText,
  id,
  modalActionItemLabel = 'Done',
  autoHighlight,
  autoHighlightWhenFilled,
  inputValue,
  autoSelect,
  isVirtualized = true,
  optionProps: incomingOptionProps,
  inputProps,
  deleteIconProps,
  findByAllParams,
  toggleButtonProps,
}: SelectProps<T, Multiple, FreeSolo, FreeSoloCreatable>): JSX.Element {
  const [infoMessageHeight, setInfoMessageHeight] = useState(0);

  const { classes, cx } = useStyles({ infoMessageHeight });
  const { isTabletUp } = useScreenSize('Tablet');

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownTriggered, setIsDropdownTriggered] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutocopleteOpen, setIsAutocopleteOpen] = useState(false);

  const [isFreeSoloSaveButtonShown, setFreeSoloSaveButtonShown] = useState(false);
  const [isListNavigated, setIsListNavigated] = useState(false);

  const autocompleteInputRef = useRef<HTMLDivElement>(null);

  const [freeSoloInputValue, setFreeSoloInputValue] = useState('');

  useEffect(() => {
    if (freeSolo || freeSoloCreatable) {
      if (value) {
        setFreeSoloInputValue(getOptionLabel(value as T));
      } else {
        setFreeSoloInputValue('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, freeSolo, freeSoloCreatable]);

  const optionsCount = useMemo(
    () =>
      Array.isArray(options) ? options.length : Object.keys(options).reduce((sum, key) => sum + options[key].length, 0),
    [options]
  );

  const autocompleteOptions = useMemo(() => {
    let res: (SpecialOption | T)[] = [];
    if (multiple && selectAllLabel && onSelectAll && !!optionsCount) {
      res = [{ value: SelectAllOptionValue, label: selectAllLabel }];
    }
    if (Array.isArray(options)) {
      res = [...res, ...options];
    } else {
      const sectionTitles = Object.keys(options);
      for (let i = 0; i < sectionTitles.length; i++) {
        const sectionTitle = sectionTitles[i];
        res = [...res, { value: TitleOptionValue, label: sectionTitle }, ...options[sectionTitle]];
      }
    }
    return res;
  }, [multiple, selectAllLabel, onSelectAll, optionsCount, options]);

  const isEachOptionSelected = multiple && optionsCount === (value as Value<T, true>).length;

  const handleToggleSelectAll = () => {
    if ((value as Value<T, true>).length === 0) {
      onSelectAll?.(true);
    }
    if ((value as Value<T, true>).length > 0) {
      onSelectAll?.(false);
    }
  };

  const handleClear = () => {
    if ((!clearable || !value) && !freeSoloInputValue) {
      return;
    }
    if (!multiple) {
      if ((freeSolo || freeSoloCreatable || autoHighlightWhenFilled) && !value) {
        setFreeSoloInputValue('');
        if (onInputChange) {
          onInputChange('');
        }
        return;
      }

      if (freeSolo || freeSoloCreatable || autoHighlightWhenFilled) {
        setFreeSoloInputValue('');
        if (onInputChange) {
          onInputChange('');
        }
      }
      onChange(null, null as AutocompleteValue<T, Multiple, undefined, undefined>);
      return;
    }
    if (multiple && onSelectAll) {
      onSelectAll(false);
    }
    onChange(null, [] as unknown as AutocompleteValue<T, Multiple, undefined, undefined>);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedOptions: AutocompleteValue<T, Multiple, undefined, undefined>
  ) => {
    if (disabled) {
      return;
    }

    if (autoHighlightWhenFilled && event.type === 'blur' && !value && !freeSoloInputValue && !isListNavigated) {
      handleClear();
      return;
    }
    setIsDropdownTriggered(true);
    if (multiple && onSelectAll) {
      if ((selectedOptions as Value<T, true>).find((option) => isSelectAllOption(option))) {
        handleToggleSelectAll();
        return;
      }
      onToggleOption && onToggleOption(selectedOptions as Value<T, true>);
    }
    onChange?.(event, selectedOptions as AutocompleteValue<T, Multiple, undefined, undefined>);
    if (!isTabletUp && !multiple) {
      setIsModalOpen(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent, val: string) => {
    setIsDropdownTriggered(false);

    if (!multiple && event?.type === 'change' && val === '') {
      handleClear();
    }

    if (freeSolo || freeSoloCreatable || autoHighlightWhenFilled) {
      setFreeSoloInputValue(val);
    }

    if (onInputChange) {
      onInputChange(val);
    }
  };

  const handleOpen = () => {
    if (autoHighlightWhenFilled) {
      setIsListNavigated(false);
    }
    if (!disabled && !readOnly) {
      setIsOpen(true);
    }
  };

  const handleClose = (event: React.SyntheticEvent, reason: string) => {
    setIsOpen(false);
    if (!isTabletUp && !multiple && reason === 'selectOption') {
      setIsModalOpen(false);
    }
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    if ((freeSolo || freeSoloCreatable) && !value && !!freeSoloInputValue) {
      setFreeSoloInputValue('');
      if (onInputChange) {
        onInputChange('');
      }
    }
    if (
      (freeSolo || freeSoloCreatable) &&
      !!value &&
      !!freeSoloInputValue &&
      freeSoloInputValue !== getOptionLabel(value as T)
    ) {
      setFreeSoloInputValue(getOptionLabel(value as T));
      if (onInputChange) {
        onInputChange(getOptionLabel(value as T));
      }
    }
    setIsModalOpen(false);
  };

  const onToggle = () => setIsOpen((prev) => !prev);

  const handleFreeSolo = (e: React.SyntheticEvent) => {
    if (freeSoloInputValue) {
      onChange(e, freeSoloInputValue as AutocompleteValue<T, Multiple, undefined, undefined>);
      onCloseModal();
    }
  };

  const filterOptions = (items: (SpecialOption | T)[], state: FilterOptionsState<T>) => {
    function sortStartsWithLogicThenContainsLogic(input: string, data: T[]) {
      const startsWith: T[] = [];
      const contains: T[] = [];

      for (let i = 0; i < data.length; i++) {
        if (
          state
            .getOptionLabel(data[i] as T)
            .toLowerCase()
            .indexOf(input.toLowerCase()) === 0
        ) {
          startsWith.push(data[i]);
        } else {
          contains.push(data[i]);
        }
      }

      startsWith.sort((a, b) =>
        sortAlphabeticallyAscending(state.getOptionLabel(a as T), state.getOptionLabel(b as T))
      );
      contains.sort((a, b) => sortAlphabeticallyAscending(state.getOptionLabel(a as T), state.getOptionLabel(b as T)));

      return startsWith.concat(contains);
    }

    function splitArrayBasedOnElementsAnotherArray(
      data: (T | SpecialOption)[],
      keys: (T | SpecialOption)[]
    ): (T | SpecialOption)[][] {
      const acc: (T | SpecialOption)[][] = [];
      let currData: (T | SpecialOption)[] = [];

      for (let i = 0; i < data.length; i++) {
        if (i > 0 && keys.includes(data[i])) {
          acc.push(currData);
          currData = [];
        }

        currData.push(data[i]);
      }

      acc.push(currData);
      return acc;
    }

    // when we select option and click again arrow btn (on input focused), list of items had item which filtered (not all list items)
    // to solve this case, added extra variable
    const inputVal: string = isDropdownTriggered ? '' : state.inputValue.trim();

    const singleMatchItems = items.filter(
      (item: SpecialOption) =>
        isSpecialOption(item) ||
        !inputVal ||
        state
          .getOptionLabel(item as T)
          .toLowerCase()
          .includes(inputVal.toLowerCase())
    );

    const multiMatchItems =
      findByAllParams &&
      items.filter((item) => {
        for (let i = 0; i < findByAllParams?.length; i++) {
          const filteredValues = (item[findByAllParams[i] as keyof typeof item] as string)?.toLowerCase();
          if (
            filteredValues?.includes(inputVal.toLowerCase()) ||
            !inputVal ||
            state
              .getOptionLabel(item as T)
              .toLowerCase()
              .includes(inputVal.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });

    const matchingItems = multiMatchItems ?? singleMatchItems;

    const isExisting = matchingItems?.some(
      (item) => inputVal.toLowerCase() === state.getOptionLabel(item as T).toLowerCase()
    );

    const filteredMatchingItems = matchingItems.filter((item, index) => {
      const nextItem = index + 1 < matchingItems.length ? matchingItems[index + 1] : null;
      // hide Select All option when input is not empty
      if (isSelectAllOption(item) && inputVal) return false;
      // hide title of group with no matching options
      if (isTitleOption(item) && (!nextItem || isSpecialOption(nextItem))) return false;
      return true;
    });

    if (filteredMatchingItems.find((option) => isTitleOption(option))) {
      const titles = filteredMatchingItems.filter((item) => isTitleOption(item));
      const splitedOptionsByTitles = splitArrayBasedOnElementsAnotherArray(filteredMatchingItems, titles);

      const sortSplitOptions = splitedOptionsByTitles.map((array: (T | SpecialOption)[]) => {
        const sectionTitle = array[0];
        const filteredOptions = array.filter((item) => !isSpecialOption(item));
        return sectionTitle
          ? [sectionTitle, ...sortStartsWithLogicThenContainsLogic(inputVal, filteredOptions as T[])]
          : [];
      });

      const accumulatedOptions = sortSplitOptions.reduce((acc, val) => acc.concat(val), []);

      if (inputVal) {
        return accumulatedOptions;
      }

      return filteredMatchingItems;
    }

    const sortedOptions = sortStartsWithLogicThenContainsLogic(inputVal, filteredMatchingItems as T[]);

    if (freeSoloCreatable && inputVal !== '' && !isExisting) {
      return [
        ...sortedOptions,
        {
          inputVal,
          value: FreeSoloCreatableOptionValue,
          label: `Add "${inputVal}"`,
        },
      ];
    }

    if (inputVal) {
      return sortedOptions;
    }
    return filteredMatchingItems;
  };

  const renderOption = (optionProps: Record<string, unknown>, option: T, { selected }: { selected: boolean }) => {
    const key = optionProps.id as string;
    if (isTitleOption(option)) {
      const isFirstTitle = (optionProps['data-option-index'] as number) <= 1;
      return (
        <li key={key} className={classes.titleRoot}>
          {!isFirstTitle && <Divider direction="horizontal" />}
          <Typography
            weight="emphasis"
            variant="body400"
            className={classes.title}
            component="span"
            {...(incomingOptionProps || {})}
          >
            {option.label}
          </Typography>
        </li>
      );
    }

    if (isFreeSoloCreatableOption(option)) {
      const isFreeSoloCreatableAndNoOtherOptions = (optionProps['data-option-index'] as number) === 0;
      const isDesktopDivider = isTabletUp && !isFreeSoloCreatableAndNoOtherOptions;

      return (
        <li
          {...optionProps}
          key={key}
          className={cx(classes.item, {
            [classes.itemWithAutoHighlight]: autoHighlight || autoHighlightWhenFilled,
          })}
        >
          {(!isTabletUp || isDesktopDivider) && <Divider direction="horizontal" />}
          <DropdownAction
            label={getOptionLabel(option)}
            focusVisibleClassName={classes.menuItem}
            buttonProps={incomingOptionProps}
          />
        </li>
      );
    }

    const isIndeterminate =
      isSelectAllOption(option) &&
      (value as Value<T, true>).length !== 0 &&
      optionsCount > (value as Value<T, true>).length;

    const isSelectAllChecked = isEachOptionSelected || isIndeterminate;
    if (!multiple) {
      return (
        <li
          {...optionProps}
          key={key}
          className={cx(classes.item, {
            [classes.itemWithAutoHighlight]: autoHighlight || autoHighlightWhenFilled,
          })}
        >
          <MenuItem
            disabled={disabled}
            label={getOptionLabel(option)}
            startIcon={getOptionStartIcon?.(option)}
            selected={selected}
            elementType="div"
            focusVisibleClassName={classes.menuItem}
            buttonProps={incomingOptionProps}
          />
        </li>
      );
    }
    return (
      <li
        {...optionProps}
        key={key}
        className={cx(
          classes.item,
          { [classes.itemWithAutoHighlight]: autoHighlight || autoHighlightWhenFilled },
          { [classes.selectAll]: isSelectAllOption(option) }
        )}
      >
        <MenuItem
          checkbox
          disabled={disabled}
          onCheckboxChange={() => null}
          label={isSelectAllOption(option) ? selectAllLabel : getOptionLabel(option)}
          selected={isSelectAllOption(option) ? isSelectAllChecked : selected}
          indeterminate={isIndeterminate}
          elementType="div"
          focusVisibleClassName={classes.menuItem}
          checkboxProps={incomingOptionProps}
        />
        {isSelectAllOption(option) && <Divider direction="horizontal" className={classes.divider} />}
      </li>
    );
  };

  const renderTitle = () => {
    return (
      <Typography variant="h5" className={classes.heading} component="span">
        {label}
      </Typography>
    );
  };

  const shouldShowClearButton = (() => {
    if (!clearable || readOnly) {
      return false;
    }
    if (!value && !freeSoloInputValue) {
      return false;
    }
    // For MakeSelect logic
    if (value && getOptionLabel(value as T) === '' && inputValue === '') {
      return false;
    }
    if (multiple && !(value as Value<T, true>).length) {
      return false;
    }

    return true;
  })();

  const hasEndAdornment = (() => {
    if (freeSolo || freeSoloCreatable || readOnly) {
      return false;
    }
    return true;
  })();

  const renderStartAdornment = (adjustToBottom = true) => {
    return (
      <StartAdornment<T, Multiple>
        multiple={multiple}
        value={value as Value<T, Multiple>}
        getOptionStartIcon={getOptionStartIcon}
        getOptionLabel={getOptionLabel}
        isDisabled={!!disabled}
        isEachOptionSelected={isEachOptionSelected}
        adjustToBottom={adjustToBottom}
      />
    );
  };

  const shouldHideMobileSearchable = !isTabletUp && !searchable;

  const isExistingFreeSolo = autocompleteOptions.some(
    (item) =>
      freeSoloInputValue?.toLowerCase().trim() ===
      getOptionLabel(item as T)
        .toLowerCase()
        .trim()
  );

  const shouldShowFreeSelectButton =
    freeSolo &&
    !!freeSoloInputValue &&
    isFreeSoloSaveButtonShown &&
    !isExistingFreeSolo &&
    (value === null || ((!!value || freeSoloInputValue !== '') && freeSoloInputValue !== getOptionLabel(value as T)));

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (autoHighlightWhenFilled && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setIsListNavigated(true);
    }
  };

  const commonProps = {
    popperProps,
    onOpen: handleOpen,
    onClose: handleClose,
    onInputChange: handleInputChange,
    onBlur,
    onFocus,
    isLoading: loading,
    isOptionEqualToValue,
    options: autocompleteOptions,
    multiple,
    getOptionLabel,
    getOptionDisabled,
    disabled,
    readOnly,
    value,
    onChange: handleChange,
    filterOptions,
    NoOptionsText,
    className,
    renderOption: renderOptionProp instanceof Function ? renderOptionProp : renderOption,
    id,
    searchable,
    placeholder,
    getOptionStartIcon,
    isEachOptionSelected,
    onClear: handleClear,
    clearable,
    freeSolo: freeSolo || freeSoloCreatable,
    hasEndAdornment,
    shouldShowClearButton,
    selectOnFocus: freeSolo || freeSoloCreatable,
    handleHomeEndKeys: freeSoloCreatable,
    autoHighlight: autoHighlight || autoHighlightWhenFilled,
    inputValue: freeSolo || freeSoloCreatable ? freeSoloInputValue : inputValue,
    autoSelect: isTabletUp && autoSelect,
    isFreeSoloSearchInput: freeSolo && isFreeSoloSearchInput,
    isVirtualized: isVirtualized && !autoHighlight,
    freeSoloCreatable,
    clearOnBlurFreeSoloCreatable: setFreeSoloInputValue,
    infoMessage,
    toggleButtonProps,
  };

  useComponentCountController('Select:mobileModal', !isTabletUp && isModalOpen);

  if (isTabletUp) {
    return (
      <Autocomplete<T, Multiple>
        {...commonProps}
        onKeyDown={handleKeyDown}
        isOpen={isOpen}
        label={label}
        required={required}
        errorMessage={errorMessage}
        helpText={helpText}
        helpTextProps={helpTextProps}
        actionHelpText={actionHelpText}
        onActionHelpText={onActionHelpText}
        fullWidth={fullWidth}
        inputRef={inputRef}
        inputElementRef={inputElementRef}
        endAdornment={
          <EndAdornment
            multiple={multiple}
            isDisabled={!!disabled}
            onClear={handleClear}
            onEndAdornmentClick={onToggle}
            withEndAdornment={hasEndAdornment}
            shouldShowClearButton={shouldShowClearButton}
            clearButtonProps={deleteIconProps}
            toggleButtonProps={toggleButtonProps}
          />
        }
        startAdornment={renderStartAdornment()}
        startIcon={startIcon}
        inputClassName={cx({ [classes.multipleInputRoot]: multiple })}
        listboxClassName={classes.listboxDesktop}
        paperSurfaceClassName={classes.paperSurface}
        inputProps={inputProps}
      />
    );
  }

  return (
    <>
      <TextField
        id={`id-input-${label}`}
        className={cx(classes.formControl, className)}
        onClick={onOpenModal}
        onBlur={onBlur}
        onFocus={onFocus}
        value={(value && getOptionLabel(value as T)) || ''}
        label={label}
        placeholder={placeholder}
        startIcon={startIcon}
        disabled={disabled}
        readOnly={readOnly}
        fullWidth={fullWidth}
        required={required}
        errorMessage={errorMessage}
        helpText={helpText}
        helpTextProps={helpTextProps}
        actionHelpText={actionHelpText}
        onActionHelpText={onActionHelpText}
        startAdornment={renderStartAdornment()}
        inputProps={{
          autoComplete: 'off',
          className: cx(classes.input),
          ...(inputProps || {}),
        }}
        inputClassName={cx({ [classes.multipleInputRoot]: multiple })}
        endAdornment={
          <EndAdornment
            multiple={multiple}
            isDisabled={!!disabled}
            onClear={handleClear}
            onEndAdornmentClick={onOpenModal}
            withEndAdornment={hasEndAdornment}
            shouldShowClearButton={shouldShowClearButton}
            clearButtonProps={deleteIconProps}
            toggleButtonProps={toggleButtonProps}
          />
        }
        labelClassName={cx({
          [classes.fullWidthLabel]: !hasEndAdornment,
          [classes.label]: !startIcon && !shouldShowClearButton && hasEndAdornment,
          [classes.labelShortest]: !startIcon && shouldShowClearButton && hasEndAdornment,
          [classes.labelWithStartIcon]: !!startIcon && !shouldShowClearButton && hasEndAdornment,
          [classes.labelShortestWithStartIcon]: !!startIcon && shouldShowClearButton && hasEndAdornment,
        })}
        inputElementRef={inputElementRef}
      />
      <Modal
        id={`id-modal-${label}`}
        TransitionProps={{
          onEntered: () => {
            setIsAutocopleteOpen(true);
            autocompleteInputRef?.current?.click();
            if (freeSolo) {
              setFreeSoloSaveButtonShown(true);
            }
          },
          onExiting: () => {
            setIsAutocopleteOpen(false);
            if (freeSolo) {
              setFreeSoloSaveButtonShown(false);
            }
          },
        }}
        open={isModalOpen}
        onClose={onCloseModal}
        title={renderTitle()}
        rootClassName={classes.modalHeightWithSearch}
        containerClassName={classes.modalContainer}
        titleClassName={classes.modalTitle}
        paperClassName={classes.modalPaper}
      >
        <Autocomplete<T, Multiple>
          {...commonProps}
          isOpen={isAutocopleteOpen}
          inputRef={autocompleteInputRef}
          takeInfoMessageHeight={setInfoMessageHeight}
          fullWidth
          endAdornment={
            <EndAdornment
              multiple={multiple}
              isDisabled={!!disabled}
              onClear={handleClear}
              shouldShowClearButton={shouldShowClearButton}
              clearButtonProps={deleteIconProps}
            />
          }
          startAdornment={renderStartAdornment(false)}
          startIcon={!freeSolo && !freeSoloCreatable && <Icon icon={Search} />}
          popperClassName={cx(classes.popper, {
            [classes.popperWithSearch]: !shouldHideMobileSearchable,
            [classes.popperWithoutSearch]: shouldHideMobileSearchable,
          })}
          listboxClassName={cx(classes.listbox, {
            [classes.listboxMobileWithActionButton]: multiple && !shouldHideMobileSearchable,
            [classes.listboxMobile]: !multiple && !shouldHideMobileSearchable,
            [classes.listboxMobileWithFreeSolo]: shouldShowFreeSelectButton && !multiple && !shouldHideMobileSearchable,
            [classes.listboxMobileWithActionButtonWithoutSearch]: multiple && shouldHideMobileSearchable,
            [classes.listboxMobileWithoutSearch]: !multiple && shouldHideMobileSearchable,
          })}
          rootClassName={cx(shouldHideMobileSearchable ? classes.hiddenMobileRoot : classes.mobileRoot)}
        />
        {shouldShowFreeSelectButton && (
          <div className={classes.modalActionItem}>
            <Divider direction="horizontal" />
            <DropdownAction label={`Select "${freeSoloInputValue}"`} onClick={(e) => handleFreeSolo(e)} />
          </div>
        )}
        {multiple && (
          <div className={classes.modalActionItem}>
            <Divider direction="horizontal" />
            <div className={classes.modalActionButton}>
              <Button label={modalActionItemLabel} variant="primary" fullWidth onClick={onCloseModal} />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
