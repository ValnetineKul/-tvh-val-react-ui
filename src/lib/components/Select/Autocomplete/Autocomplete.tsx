import React from 'react';
import type { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { default as MuiAutocomplete } from '@mui/material/Autocomplete';
import type { AutocompleteValue, InputBaseComponentProps, PopperProps } from '@mui/material';
import { Popper } from '@mui/material';
import Surface from '../../Surfaces/Surface';
import SpinnerWithBackdrop from '../../ProgressIndicators/Spinner/SpinnerWithBackdrop';
import TextField from '../../TextField';
import InlineMessage from '../../InlineMessage';
import Divider from '../../Divider';
import type { CommonSelectProps } from '../Select.types';
import { mergeRefs } from '../../../utils/refs';
import useStyles from './Autocomplete.styles';
import VirtualizedList from '../../VirtualizedList';
import type { DataAttributes } from '../../../types/common';

export type AutocompleteProps = {
  inputRef?: React.Ref<HTMLDivElement>;
  inputElementRef?: React.Ref<HTMLInputElement>;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactElement | null;
  startIcon?: React.ReactNode;
  hasEndAdornment?: boolean;
  shouldShowClearButton?: boolean;
  inputClassName?: string;
  popperClassName?: string;
  listboxClassName?: string;
  rootClassName?: string;
  paperSurfaceClassName?: string;
  isVirtualized?: boolean;
  takeInfoMessageHeight?: (height: number) => void;
  isFreeSoloSearchInput?: boolean;
  clearOnBlurFreeSoloCreatable?: React.Dispatch<React.SetStateAction<string>>;
  infoMessage?: string;
  inputProps?: InputBaseComponentProps & DataAttributes;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
};

export type Props<T, Multiple> = CommonSelectProps<T, Multiple> & AutocompleteProps;

function Autocomplete<T, Multiple>({
  isOpen,
  multiple,
  popperProps,
  freeSolo,
  NoOptionsText,
  className,
  isLoading = false,
  searchable,
  id,
  disabled,
  readOnly,
  value,
  getOptionStartIcon,
  getOptionLabel,
  isEachOptionSelected,
  onBlur,
  clearable,
  inputRef,
  inputElementRef,
  onClear,
  label,
  placeholder,
  helpText,
  helpTextProps,
  startIcon,
  required,
  errorMessage,
  actionHelpText,
  onActionHelpText,
  onInputChange,
  fullWidth,
  endAdornment,
  startAdornment,
  inputClassName,
  popperClassName,
  listboxClassName,
  rootClassName,
  paperSurfaceClassName,
  hasEndAdornment,
  shouldShowClearButton,
  autoHighlight,
  isVirtualized,
  takeInfoMessageHeight,
  inputValue,
  autoSelect,
  isFreeSoloSearchInput,
  freeSoloCreatable,
  clearOnBlurFreeSoloCreatable,
  infoMessage,
  inputProps: incomingInputProps,
  ...props
}: Props<T, Multiple>) {
  const { classes, cx } = useStyles();

  const popper = (defaultPopperProps: PopperProps) => {
    if (!defaultPopperProps.anchorEl) {
      return null;
    }
    const { className: popperDefaultClassName } = popperProps || {};

    return (
      <Popper
        {...defaultPopperProps}
        placement="bottom-start"
        className={cx(defaultPopperProps.className, popperDefaultClassName)}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
        ]}
      />
    );
  };

  const PaperComponent = (children: React.ReactNode) => {
    const infoRef = React.useRef<HTMLDivElement>(null);

    const takeInfoMessageHeightHandler = (data: number) => {
      if (!takeInfoMessageHeight) {
        return;
      }
      takeInfoMessageHeight(data);
    };

    React.useLayoutEffect(() => {
      const handleResize = (entries: ResizeObserverEntry[]) => {
        const entry = entries[0];
        takeInfoMessageHeightHandler(entry.contentRect.height);
      };
      if (!infoRef.current) {
        takeInfoMessageHeightHandler(0);
        return;
      }
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(infoRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    });

    return (
      <Surface color="100" className={paperSurfaceClassName}>
        <SpinnerWithBackdrop className={cx(listboxClassName, classes.fullSpinner)} isLoading={isLoading}>
          {children}
        </SpinnerWithBackdrop>
        {infoMessage && (
          <div ref={infoRef}>
            <Divider direction="horizontal" />
            <InlineMessage status="info" message={infoMessage} className={classes.infoMessage} size="sm" />
          </div>
        )}
      </Surface>
    );
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (freeSoloCreatable && clearOnBlurFreeSoloCreatable && inputValue !== '') {
      if (!value) {
        clearOnBlurFreeSoloCreatable('');
      }
      if (value && inputValue !== getOptionLabel(value as T)) {
        clearOnBlurFreeSoloCreatable(getOptionLabel(value as T));
      }
    }
    onBlur && onBlur(e);
  };

  const renderInput = ({
    InputProps: { ref: InputRef, ...InputProps },
    inputProps: { ref, ...inputProps },
    ...params
  }: AutocompleteRenderInputParams & {
    inputProps: InputBaseComponentProps & { ref: React.RefObject<HTMLInputElement> };
  }) => {
    return (
      <TextField
        type={isFreeSoloSearchInput ? 'search' : 'text'}
        className={cx(InputProps.className, classes.formControl, { [classes.fullWidth]: fullWidth })}
        {...params}
        disabled={disabled}
        readOnly={readOnly}
        actionHelpText={actionHelpText}
        fullWidth={fullWidth}
        onActionHelpText={onActionHelpText}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        editable={searchable}
        placeholder={placeholder}
        helpText={helpText}
        helpTextProps={helpTextProps}
        startIcon={startIcon}
        required={required}
        inputRef={InputRef as React.RefObject<HTMLDivElement>}
        inputElementRef={inputElementRef}
        errorMessage={errorMessage}
        label={label}
        onChange={(e) => onInputChange?.(e, e.target.value)}
        onBlur={(e) => handleOnBlur(e)}
        inputProps={{
          ref: inputRef ? mergeRefs([ref, inputRef]) : ref,
          ...inputProps,
          className: cx(inputProps.className, classes.input, { [classes.multipleInput]: multiple }),
          ...(incomingInputProps || {}),
        }}
        inputClassName={inputClassName}
        labelClassName={cx({
          [classes.fullWidthLabel]: freeSolo ? !hasEndAdornment && !shouldShowClearButton : !hasEndAdornment,
          [classes.label]: freeSolo ? shouldShowClearButton : !startIcon && !shouldShowClearButton && hasEndAdornment,
          [classes.labelShortest]: !startIcon && shouldShowClearButton && hasEndAdornment,
          [classes.labelWithStartIcon]: !!startIcon && !shouldShowClearButton && hasEndAdornment,
          [classes.labelShortestWithStartIcon]: !!startIcon && shouldShowClearButton && hasEndAdornment,
        })}
      />
    );
  };

  const ListBoxComponent = React.forwardRef<HTMLDivElement | HTMLUListElement, React.HTMLAttributes<HTMLElement>>(
    (listBoxProps, ref) => {
      return isVirtualized ? (
        <VirtualizedList ref={ref as React.Ref<HTMLDivElement>} {...listBoxProps} listboxClassName={listboxClassName} />
      ) : (
        <ul ref={ref as React.LegacyRef<HTMLUListElement>} {...listBoxProps} />
      );
    }
  );

  // keyboard navigation for multiple Autocomplete does not work properly because of 2 open issues:
  // 1) multiple + disableCloseOnSelect: https://github.com/mui/material-ui/issues/30948
  // 2) PaperComponent: https://github.com/mui/material-ui/issues/31073
  return (
    <MuiAutocomplete
      open={isOpen}
      PopperComponent={popper}
      disableCloseOnSelect={multiple}
      freeSolo={freeSolo}
      noOptionsText={NoOptionsText}
      openOnFocus
      forcePopupIcon={false}
      multiple={multiple}
      id={id}
      disabled={disabled || readOnly}
      fullWidth={fullWidth}
      // workaround to set the correct type for value
      value={value as AutocompleteValue<T, Multiple, undefined, undefined>}
      classes={{
        noOptions: classes.noOptions,
        listbox: listboxClassName,
        input: classes.autoComplete,
        popper: popperClassName,
      }}
      PaperComponent={({ children }) => PaperComponent(children)}
      className={cx(classes.root, { [classes.fullWidth]: fullWidth }, rootClassName, className)}
      disableClearable
      renderInput={renderInput}
      getOptionLabel={getOptionLabel}
      ListboxComponent={ListBoxComponent}
      autoHighlight={autoHighlight}
      inputValue={inputValue}
      autoSelect={autoSelect}
      {...props}
    />
  );
}

export default Autocomplete;
