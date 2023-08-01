import { useRef, useEffect } from 'react';
import type { Country } from 'react-phone-number-input';
import {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input';
import type { PhoneFieldProps } from '../PhoneField.types';
import { useLazyRef } from '../../../hooks/useLazyRef';

type UseValueChangeProps = {
  defaultCountry: Country;
  onChange: PhoneFieldProps['onChange'];
};

const useValueChange = ({ defaultCountry, onChange }: UseValueChangeProps) => {
  const currentCountryRef = useRef(defaultCountry);
  const previousCountryRef = useRef(currentCountryRef.current);
  const legacyNumberRef = useRef('');
  const gettersRef = useLazyRef(() => {
    return {
      getLegacyNumber: () => legacyNumberRef.current,
      isValidPhoneNumber: () =>
        legacyNumberRef.current ? isValidPhoneNumber(legacyNumberRef.current, currentCountryRef.current) : false,
      isPossiblePhoneNumber: () =>
        legacyNumberRef.current ? isPossiblePhoneNumber(legacyNumberRef.current, currentCountryRef.current) : false,
      getFormattedPhoneNumber: () => (legacyNumberRef.current ? formatPhoneNumber(legacyNumberRef.current) : ''),
      getParsedPhoneNumber: () =>
        legacyNumberRef.current ? parsePhoneNumber(legacyNumberRef.current, currentCountryRef.current) : null,
      getCountryCode: () => currentCountryRef.current,
    };
  });

  const setCurrentCountry = (country: Country) => {
    currentCountryRef.current = country;
  };

  const updatePreviousCountry = () => {
    previousCountryRef.current = currentCountryRef.current;
  };

  useEffect(updatePreviousCountry);

  const handleValueChange = (value: string | undefined) => {
    const isCountryChanged = previousCountryRef.current !== currentCountryRef.current;

    legacyNumberRef.current = '';

    if (isCountryChanged) {
      updatePreviousCountry();
    } else {
      legacyNumberRef.current = value;
    }

    onChange(value, gettersRef);
  };

  return {
    setCurrentCountry,
    handleValueChange,
  };
};

export default useValueChange;
