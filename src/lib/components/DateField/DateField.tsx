import React, { forwardRef, useEffect, useState } from 'react';
import type { FC, ComponentProps } from 'react';
import { default as MUIDesktopDatePicker } from '@mui/lab/DesktopDatePicker';
import { default as MUIMobileDatePicker } from '@mui/lab/MobileDatePicker';
import type { PickersDayProps } from '@mui/lab/PickersDay';
import type { TextFieldProps } from '@mui/material/TextField';
import type { InputBaseComponentProps } from '@mui/material/InputBase';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import PickersDay from '@mui/lab/PickersDay';
import Slide from '@mui/material/Slide';
import { useConfigContext } from '../../../themes/core';
import useScreenSize from '../../hooks/useScreenSize';
import useDateFnsLocale from './hooks/useDateFnsLocale';
import DateTextField from './DateTextField/DateTextField';
import { AngleDown, AngleLeft, AngleRight } from '../Icon/icons/functional';
import Icon from '../Icon';
import isSameDay from '../RelativeTime/helpers/isSameDay';
import type { DataAttributes } from '../../types/common';
import useStyles from './DateField.styles';

const Transition = forwardRef(
  (props: ComponentProps<typeof Slide> & { children?: React.ReactElement }, ref: React.Ref<unknown>) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

interface CommonProps {
  label: string;
  id?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  isCalendarDisabled?: boolean;
  errorMessage?: string;
  helpText?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  inputPropsDateRangeTo?: InputBaseComponentProps & DataAttributes;
  inputPropsDateRangeFrom?: InputBaseComponentProps & DataAttributes;
  inputElementRef?: React.Ref<HTMLInputElement>;
}

interface SingleDate {
  value?: Date | null;
  onChange: (value: Date | null) => void;
  dateRange?: never;
}

interface DateRange {
  dateRange: true;
  onChange: (startValue: Date | null, endValue: Date | null) => void;
  startValue: Date | null;
  endValue: Date | null;
  startInputId?: string;
  endInputId?: string;
  toLabel?: string;
  value?: never;
}

export type DateFieldProps = CommonProps & (SingleDate | DateRange);

const DateField: FC<DateFieldProps> = ({
  label,
  required,
  className,
  isCalendarDisabled = false,
  disabled,
  readOnly,
  fullWidth,
  errorMessage,
  helpText,
  inputPropsDateRangeTo,
  inputPropsDateRangeFrom,
  inputElementRef,
  ...props
}) => {
  const { locale: localeCode } = useConfigContext();
  const { locale } = useDateFnsLocale(localeCode);
  const { classes, cx } = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [insideStartValue, setInsideStartValue] = useState<Date | null>(null);
  const [insideEndValue, setInsideEndValue] = useState<Date | null>(null);
  const { isTabletUp } = useScreenSize('Tablet');

  const isDateRange = 'dateRange' in props && props.dateRange;
  const startValue = isDateRange && 'startValue' in props ? props.startValue : undefined;
  const toLabel = isDateRange && 'toLabel' in props ? props.toLabel : 'to';
  const startInputId = isDateRange && 'startInputId' in props ? props.startInputId : 'start-date';
  const endInputId = isDateRange && 'endInputId' in props ? props.endInputId : 'end-date';
  const onChange = !('dateRange' in props) && 'onChange' in props ? props.onChange : undefined;
  const onRangeChange = 'dateRange' in props && 'onChange' in props && props.onChange;

  let value: Date | null | undefined;
  // added workaround for nl-BE as datefns library hardcodes the format to be dd.MM.y
  // see https://github.com/date-fns/date-fns/blob/fadbd4eb7920bf932c25f734f3949027b2fe4887/src/locale/nl-BE/_lib/formatLong/index.ts#L8
  const localeFormat: string = locale.code === 'nl-BE' ? 'dd/MM/yyyy' : locale.formatLong?.date({ width: 'short' });

  if (isDateRange) {
    value = 'endValue' in props ? props.endValue : undefined;
  } else {
    value = 'value' in props ? props.value : undefined;
  }

  useEffect(() => {
    if (isDateRange && startValue) {
      setInsideStartValue(startValue);
    }
    if (value) {
      setInsideEndValue(value);
    }
  }, [startValue, value, isDateRange]);

  const isValidDate = (day: Date | null) => {
    return day === null || (day !== undefined && !isNaN(day.valueOf()));
  };

  const handleStartChange = (day: Date | null) => {
    if (!onRangeChange || value === undefined || !isValidDate(day)) {
      return;
    }
    onRangeChange(day, value);
    setInsideStartValue(day);
  };

  const handleEndChange = (day: Date | null) => {
    if (!onRangeChange || startValue === undefined || !isValidDate(day)) {
      return;
    }
    onRangeChange(startValue, day);
    setInsideEndValue(day);
  };

  const handleRangeChange = (day: Date | null, keyboardInputValue?: string) => {
    if (!onRangeChange) {
      return;
    }

    if (keyboardInputValue) {
      handleEndChange(day);
      return;
    }

    if (!startValue || value) {
      setInsideStartValue(day);
      setInsideEndValue(null);
      onRangeChange(day, null);
      return;
    }

    setIsOpen(false);

    if (day && startValue && day < startValue) {
      setInsideStartValue(day);
      setInsideEndValue(startValue);
      onRangeChange(day, startValue);
    } else {
      setInsideStartValue(startValue);
      setInsideEndValue(day);
      onRangeChange(startValue, day);
    }
  };

  const handleSingleChange = (day: Date | null) => {
    if (!onChange || !isValidDate(day)) {
      return;
    }
    onChange(day);
  };

  const handleChange = (day: Date | null, keyboardInputValue?: string) => {
    if (isDateRange) {
      handleRangeChange(day, keyboardInputValue);
    } else {
      handleSingleChange(day);
    }
  };

  const handleChangeMobile = (day: Date | null) => {
    if (!isDateRange) {
      setInsideEndValue(day);
      return;
    }

    if (!insideStartValue || insideEndValue) {
      setInsideStartValue(day);
      setInsideEndValue(null);
      return;
    }
    if (day && insideStartValue && day < insideStartValue) {
      setInsideStartValue(day);
      setInsideEndValue(insideStartValue);
    } else {
      setInsideStartValue(insideStartValue);
      setInsideEndValue(day);
    }
  };

  const handleOnAcceptMobile = () => {
    if (isDateRange && onRangeChange) {
      onRangeChange(insideStartValue, insideEndValue);
    } else if (onChange) {
      onChange(insideEndValue);
    }
  };

  const handleOpen = () => {
    if (!isCalendarDisabled) {
      setIsOpen(true);
    }
  };

  const handleOpenMobile = () => {
    setInsideStartValue(startValue);
    setInsideEndValue(value);

    setIsOpen(true);
  };

  const isDaySelected = (day: Date | null) => {
    if (!day) {
      return false;
    }
    if (insideStartValue && isSameDay(day, insideStartValue)) {
      return true;
    }
    if (insideEndValue && isSameDay(day, insideEndValue)) {
      return true;
    }
    return false;
  };

  const isDayInRange = (day: Date | null) => {
    if (!day || !insideStartValue || !insideEndValue) {
      return false;
    }
    if (day > insideStartValue && day < insideEndValue) {
      return true;
    }
    return false;
  };

  const renderDay = (day: Date | null, dayProps: PickersDayProps<Date | null>) => {
    return (
      <PickersDay
        {...dayProps}
        classes={{
          root: cx(classes.dayRoot, {
            [classes.dayInRange]: isDayInRange(day),
            [classes.daySelected]: isDaySelected(day),
          }),
          today: classes.today,
          selected: classes.dayNotSelected,
          dayOutsideMonth: classes.dayOutsideMonth,
        }}
      />
    );
  };

  const renderTextField = (textFieldProps: TextFieldProps, handleOnClick: () => void) => {
    const { InputProps, ...remainingTextFieldProps } = textFieldProps;
    const { type, ...remainingInputProps } = remainingTextFieldProps.inputProps;

    return (
      <DateTextField
        {...remainingTextFieldProps}
        id={props.id}
        className={className}
        disabled={disabled}
        onAdornmentInputValueChange={(day) => handleStartChange(day)}
        errorMessage={errorMessage}
        format={localeFormat}
        fullWidth={fullWidth}
        helpText={helpText}
        isDateRange={isDateRange}
        inputProps={remainingInputProps}
        type={textFieldProps.type as 'text'}
        adornmentInputValue={startValue}
        value={textFieldProps.value as string}
        focused={isOpen}
        label={label}
        readOnly={readOnly}
        required={required}
        prefix={isDateRange ? toLabel : undefined}
        startInputId={startInputId}
        endInputId={endInputId}
        setIsInputFocused={setIsInputFocused}
        onClick={handleOnClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleOnClick();
          }
        }}
        inputPropsDateRangeTo={inputPropsDateRangeTo}
        inputPropsDateRangeFrom={inputPropsDateRangeFrom}
        inputElementRef={inputElementRef}
      />
    );
  };

  const commonProps = {
    ...props,
    value,
    disabled,
    allowSameDateSelection: true,
    components: {
      LeftArrowIcon: () => <Icon icon={AngleLeft} />,
      RightArrowIcon: () => <Icon icon={AngleRight} />,
      SwitchViewIcon: () => <Icon icon={AngleDown} />,
    },
  };

  return (
    <LocalizationProvider locale={locale} dateAdapter={AdapterDateFns}>
      {isTabletUp || isCalendarDisabled ? (
        <MUIDesktopDatePicker
          {...commonProps}
          onChange={handleChange}
          open={isOpen && !isCalendarDisabled}
          inputFormat={localeFormat}
          onClose={() => {
            if (!isInputFocused) setIsOpen(false);
          }}
          disableCloseOnSelect={isDateRange}
          PaperProps={{ className: classes.paperRoot }}
          PopperProps={{ placement: 'bottom-start' }}
          renderDay={(day, selectedDates, dayProps) => renderDay(day, dayProps)}
          renderInput={(textFieldProps) => renderTextField(textFieldProps, handleOpen)}
        />
      ) : (
        <MUIMobileDatePicker
          {...commonProps}
          onChange={handleChangeMobile}
          onAccept={handleOnAcceptMobile}
          open={isOpen}
          inputFormat={localeFormat}
          onClose={() => {
            setIsOpen(false);
          }}
          renderDay={(day, selectedDates, dayProps) => renderDay(day, dayProps)}
          renderInput={(textFieldProps) => renderTextField(textFieldProps, handleOpenMobile)}
          DialogProps={{
            className: classes.paperRoot,
            BackdropProps: { className: classes.backdrop },
            fullWidth: true,
            PaperProps: { square: true },
            TransitionComponent: Transition,
          }}
        />
      )}
    </LocalizationProvider>
  );
};

export default DateField;
