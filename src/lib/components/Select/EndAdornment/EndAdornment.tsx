import React from 'react';
import IconButton from '../../Buttons/IconButton';
import Icon from '../../Icon';
import { AngleDown, Times } from '../../Icon/icons/functional';
import InputAdornment from '../../TextField/InputAdornment';
import type { DataAttributes } from '../../../types/common';
import useStyles from './EndAdornment.styles';

type CommonProps = {
  multiple: boolean;
  isDisabled?: boolean;
};

interface WithClearButton {
  shouldShowClearButton: boolean;
  onClear: () => void;
  clearButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

interface WithToggleButton {
  withEndAdornment: boolean;
  onEndAdornmentClick: () => void;
  toggleButtonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}

type Props = CommonProps & (WithClearButton | WithToggleButton | (WithClearButton & WithToggleButton));

export default function EndAdornment({ multiple, isDisabled = false, ...props }: Props) {
  const { cx, classes } = useStyles();

  const shouldShowClearButton = 'shouldShowClearButton' in props && props.shouldShowClearButton;
  const onClear = 'onClear' in props && props.onClear;
  const clearButtonProps = 'clearButtonProps' in props && props.clearButtonProps;
  const toggleButtonProps = 'toggleButtonProps' in props && props.toggleButtonProps;

  const isEndAdornment = 'withEndAdornment' in props && props.withEndAdornment;
  const onEndAdornmentClick = 'onEndAdornmentClick' in props && props.onEndAdornmentClick;

  return (
    <InputAdornment position="end" className={cx({ [classes.multipleEndAdornment]: multiple })}>
      {shouldShowClearButton && onClear && (
        <IconButton
          disabled={isDisabled}
          aria-label="Clear value"
          onClick={onClear}
          icon={<Icon icon={Times} />}
          tabIndex={-1}
          {...clearButtonProps}
        />
      )}
      {isEndAdornment && onEndAdornmentClick && (
        <IconButton
          disabled={isDisabled}
          aria-label="Toggle select"
          onClick={onEndAdornmentClick}
          icon={<Icon icon={AngleDown} />}
          tabIndex={-1}
          {...toggleButtonProps}
        />
      )}
    </InputAdornment>
  );
}
