import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import type { InputBaseComponentProps } from '@mui/material/InputBase';
import OutlinedInput from '@mui/material/OutlinedInput';

import type { FC } from 'react';
import React, { useState } from 'react';
import Surface from '../Surfaces/Surface';
import IconButton from '../Buttons/IconButton';
import { Eye, EyeSlash } from '../Icon/icons/functional';
import Icon from '../Icon';
import InlineMessage from '../InlineMessage';
import Typography from '../Typography';
import useStyles from './TextField.styles';
import InputAdornment from './InputAdornment';
import type { InputLabelPropsType } from './InputLabel';
import InputLabel from './InputLabel';
import type { DataAttributes } from '../../types/common';

export interface TextFieldProps {
  id?: string;
  type?: 'text' | 'number' | 'password' | 'search';
  label?: string;
  placeholder?: string;
  value?: string | number;
  prefix?: string;
  suffix?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startAdornment?: React.ReactElement | null;
  endAdornment?: React.ReactNode;
  errorMessage?: string;
  actionErrorMessage?: string;
  actionErrorMessageProps?: DataAttributes;
  onActionErrorMessage?: () => void;
  helpText?: string;
  actionHelpText?: string;
  onActionHelpText?: () => void;
  characterCount?: boolean;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  focused?: boolean;
  alignment?: 'start' | 'end';
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // mui / inputBase doesn't overwrite the signature for onKeyPress and it comes from HTMLDivElement
  onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputRef?: React.Ref<HTMLDivElement>;
  inputElementRef?: React.Ref<HTMLInputElement>;
  minRows?: string | number;
  maxRows?: string | number;
  rows?: number | string;
  multiline?: boolean;
  className?: string;
  inputRootMultilineClassName?: string;
  inputClassName?: string;
  inputElementClassName?: string;
  labelClassName?: string;
  inputMultilineClassName?: string;
  autoFocus?: boolean;
  autoSelect?: boolean;
  inputComponent?: React.ElementType<InputBaseComponentProps>;
  inputProps?: InputBaseComponentProps & DataAttributes;
  helpTextProps?: DataAttributes;
  InputLabelProps?: InputLabelPropsType;
  /** Opposite of "readOnly" + doesn't change styles of the component */
  editable?: boolean;
  autoComplete?: string;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  showPasswordButtonProps?: DataAttributes;
}

const TextField: FC<TextFieldProps> = ({
  id,
  type = 'text',
  label,
  value,
  prefix,
  suffix,
  startIcon,
  endIcon,
  startAdornment,
  endAdornment,
  errorMessage,
  actionErrorMessage,
  actionErrorMessageProps,
  onActionErrorMessage,
  helpText,
  actionHelpText,
  onActionHelpText,
  maxLength,
  disabled,
  readOnly,
  focused = false,
  alignment = 'start',
  onChange,
  onFocus,
  inputRef,
  inputElementRef,
  characterCount = false,
  fullWidth = false,
  required = false,
  multiline,
  className,
  inputRootMultilineClassName,
  inputClassName,
  inputElementClassName,
  labelClassName,
  inputMultilineClassName,
  autoFocus = false,
  autoSelect = false,
  inputComponent = 'input' as React.ElementType<InputBaseComponentProps>,
  inputProps = {},
  editable = true,
  InputLabelProps,
  helpTextProps,
  showPasswordButtonProps,
  autoComplete,
  onPaste,
  ...props
}) => {
  const { classes, cx } = useStyles();
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    onChange && onChange(event);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    autoSelect && event.target.select();
    onFocus && onFocus(event);
  };

  const startAdornments = (() => {
    const adornments: React.ReactNode[] = [];

    if (startIcon) {
      adornments.push(
        <InputAdornment key="startIcon" position="start" className={cx(classes.adornment, classes.startIcon)}>
          {startIcon}
        </InputAdornment>
      );
    }
    if (startAdornment) {
      adornments.push(React.cloneElement(startAdornment, { key: 'startAdornment' }));
    }

    if (prefix) {
      adornments.push(
        <InputAdornment
          key="prefix"
          position="start"
          disableTypography
          className={cx(classes.adornment, classes.prefix)}
          adjustToBottom={!!label && !multiline}
        >
          <Typography component="div">{prefix}</Typography>
        </InputAdornment>
      );
    }

    if (!adornments.length) return null;
    return adornments;
  })();

  const endAdornments = (() => {
    if (endAdornment) {
      return endAdornment;
    }

    if (type === 'password' && !readOnly) {
      return (
        <InputAdornment position="end" className={cx(classes.adornment, classes.endAdornment)}>
          <IconButton
            disabled={disabled}
            icon={<Icon icon={shouldShowPassword ? EyeSlash : Eye} />}
            onClick={() => setShouldShowPassword(!shouldShowPassword)}
            {...showPasswordButtonProps}
          />
        </InputAdornment>
      );
    }
    if (endIcon && !readOnly) {
      return (
        <InputAdornment position="end" className={cx(classes.adornment, classes.endAdornment)}>
          {endIcon}
        </InputAdornment>
      );
    }
    if (suffix && !endIcon) {
      return (
        <InputAdornment
          position="end"
          disableTypography
          className={classes.adornment}
          adjustToBottom={!!label && !multiline}
        >
          <Typography component="div">{suffix}</Typography>
        </InputAdornment>
      );
    }
    return null;
  })();

  const shouldShowError = !readOnly && !disabled && (!!errorMessage || !!actionErrorMessage);
  const shouldShowInfo = !readOnly && (!!helpText || !!actionHelpText);
  const shouldBeReadOnly = readOnly && value && suffix && !disabled && !shouldShowError;

  // attribute maxLength works with types "text", "search", "url", "tel", "email", "password": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attributes
  const maxLengthSupportedInputTypes = ['text', 'password', 'search'];
  const isMaxLengthSupported = maxLengthSupportedInputTypes.includes(type);
  const shouldShowCharacterCount = characterCount && !!maxLength && !readOnly && isMaxLengthSupported;

  const shouldBeRequired = required && !readOnly;
  // we don't need placeholder to be on the right side, so I need '&& value' to leave it on the left
  const shouldAlignRight = alignment === 'end' && value;

  const inputType = (() => {
    if (type === 'password') {
      return shouldShowPassword ? 'text' : 'password';
    }
    return type;
  })();

  return (
    <FormControl
      variant="outlined"
      className={cx(classes.root, className, {
        [classes.fullWidth]: fullWidth,
        [classes.withStartIcon]: !!startIcon,
        [classes.withEndIcon]: !!endIcon,
        [classes.withStartAdornment]: !!startAdornments,
        [classes.withLabel]: !!label && !multiline,
        [classes.withError]: shouldShowError,
        [classes.disabled]: !!disabled,
        [classes.readOnly]: !!readOnly,
      })}
      margin="none"
    >
      {!!label && (
        <InputLabel
          shrink={false}
          htmlFor={id || label}
          className={cx(classes.label, labelClassName)}
          classes={{
            focused: classes.labelFocused,
          }}
          label={label}
          required={shouldBeRequired}
          disabled={disabled}
          {...InputLabelProps}
        />
      )}

      {shouldBeReadOnly ? (
        /* to remove space between value and suffix */
        <div
          className={cx(classes.readOnlyBlock, {
            [classes.withStartIcon]: !!startIcon,
          })}
        >
          {startAdornments && <div className={classes.readOnlyStartAdornment}>{startAdornments}</div>}
          <div
            className={cx(classes.readOnlyValue, {
              [classes.withStartIcon]: !!startIcon,
            })}
          >
            {value}
          </div>
          {endAdornments}
        </div>
      ) : (
        <Surface color="100">
          <OutlinedInput
            {...props}
            id={id || label || undefined}
            type={inputType}
            ref={inputRef}
            inputRef={inputElementRef}
            autoFocus={autoFocus}
            className={cx(
              classes.inputRoot,
              {
                [classes.adornedStart]: !!startAdornments,
                [classes.adornedEnd]: !!endAdornments,
                [classes.alignRight]: !!shouldAlignRight,
                [classes.withError]: shouldShowError,
                [classes.inputDisabled]: disabled,
              },
              inputClassName
            )}
            notched={false}
            multiline={multiline}
            error={shouldShowError}
            disabled={disabled}
            readOnly={readOnly || !editable}
            onChange={handleChange}
            startAdornment={startAdornments}
            endAdornment={endAdornments}
            value={value}
            classes={{
              root: cx({ [classes.focused]: !!focused }),
              input: cx(classes.input, inputElementClassName, inputMultilineClassName),
              notchedOutline: classes.notchedOutline,
              focused: classes.focused,
              error: classes.withError,
              multiline: inputRootMultilineClassName,
            }}
            inputProps={{
              ...(isMaxLengthSupported && { maxLength }),
              ...inputProps,
            }}
            inputComponent={inputComponent}
            onFocus={(e) => handleFocus(e)}
            onPaste={onPaste}
            autoComplete={autoComplete}
          />
        </Surface>
      )}

      <div className={classes.helpers}>
        {shouldShowError && (
          <FormHelperText variant="outlined" error={shouldShowError} className={classes.inlineMessage} component="div">
            <InlineMessage
              actionLabel={actionErrorMessage}
              onAction={onActionErrorMessage}
              message={errorMessage || ''}
              size="sm"
              status="error"
              buttonProps={actionErrorMessageProps}
            />
          </FormHelperText>
        )}

        {shouldShowInfo && !shouldShowError && (
          <FormHelperText variant="outlined" className={classes.inlineMessage} component="div">
            <InlineMessage
              actionLabel={actionHelpText}
              onAction={onActionHelpText}
              message={helpText || ''}
              size="sm"
              status="info"
              buttonProps={helpTextProps}
            />
          </FormHelperText>
        )}

        {shouldShowCharacterCount && (
          <FormHelperText variant="outlined" error={shouldShowError} className={classes.characterCount}>
            <Typography component="span" variant="body400" className={classes.normalOverflowWrap}>
              {(typeof value === 'string' && value?.length) || 0}/{maxLength}
            </Typography>
          </FormHelperText>
        )}
      </div>
    </FormControl>
  );
};

export default TextField;
