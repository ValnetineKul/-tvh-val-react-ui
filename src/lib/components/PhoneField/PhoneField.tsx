import React, { useMemo, forwardRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import type { FC } from 'react';
import type { Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import CountryDropdown from './CountryDropdown/CountryDropdown';
import useStyles from './PhoneField.styles';
import PhoneTextField from './PhoneTextField/PhoneTextField';
import useValueChange from './hooks/useValueChange';
import type { PhoneFieldProps } from './PhoneField.types';

const PhoneField: FC<PhoneFieldProps> = ({
  label,
  value,
  required = false,
  disabled = false,
  readOnly = false,
  fullWidth = false,
  errorMessage,
  defaultCountry = 'BE',
  countryNoResultsMessage = 'No results',
  countryDropdownTitle = 'Country',
  onChange,
  id,
  inputProps,
  buttonProps,
  inputElementRef,
}) => {
  const { classes } = useStyles();

  const { setCurrentCountry, handleValueChange } = useValueChange({
    defaultCountry: defaultCountry as Country,
    onChange,
  });

  const inputComponent = useMemo(
    () =>
      forwardRef<HTMLInputElement, React.ComponentProps<typeof PhoneTextField>>((props, ref) => (
        <PhoneTextField
          {...props}
          inputProps={{ ...props.inputProps, ...inputProps }}
          ref={ref}
          inputElementRef={inputElementRef}
        />
      )),
    // avoid recreating inputComponent on inputElementRef reference changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputProps]
  );

  return (
    <PhoneInput
      id={id}
      className={classes.root}
      label={label}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      fullWidth={fullWidth}
      errorMessage={errorMessage}
      international
      defaultCountry={defaultCountry as Country}
      value={value}
      onChange={handleValueChange}
      onCountryChange={setCurrentCountry}
      countrySelectComponent={(props) => (
        <CountryDropdown
          {...props}
          dropdownTitle={countryDropdownTitle}
          readOnly={readOnly}
          noResultsMessage={countryNoResultsMessage}
          buttonProps={buttonProps}
          errorMessage={errorMessage}
        />
      )}
      inputComponent={inputComponent}
      countryCallingCodeEditable={false}
      smartCaret={false}
    />
  );
};

export default PhoneField;
