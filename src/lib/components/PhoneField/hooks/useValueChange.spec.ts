import type { Country } from 'react-phone-number-input';
import { renderHook } from '../../../test-utils';
import useValueChange from './useValueChange';
import type { Getters } from '../PhoneField.types';

const cases = [
  {
    input: {
      number: '+320456789781',
      country: 'BE',
    },
    expected: {
      number: '+320456789781',
      legacyNumber: '+320456789781',
      isValid: true,
      isPossible: true,
      countryCode: 'BE',
      formattedNumber: '0456 78 97 81',
      parsedNumber: '+32456789781',
    },
  },
  {
    input: {
      number: '',
      country: 'BE',
    },
    expected: {
      number: '',
      legacyNumber: '',
      isValid: false,
      isPossible: false,
      countryCode: 'BE',
      formattedNumber: '',
      parsedNumber: undefined,
    },
  },
  {
    input: {
      number: '+3204567897811',
      country: 'BE',
    },
    expected: {
      number: '+3204567897811',
      legacyNumber: '+3204567897811',
      isValid: false,
      isPossible: false,
      countryCode: 'BE',
      formattedNumber: '4567897811',
      parsedNumber: '+324567897811',
    },
  },
  {
    input: {
      number: '+40',
      country: 'RO',
    },
    expected: {
      number: '+40',
      legacyNumber: '+40',
      isValid: false,
      isPossible: false,
      countryCode: 'RO',
      formattedNumber: '',
      parsedNumber: undefined,
    },
  },
  {
    input: {
      number: '+320456789781121212121212121',
      country: 'BE',
    },
    expected: {
      number: '+320456789781121212121212121',
      legacyNumber: '+320456789781121212121212121',
      isValid: false,
      isPossible: false,
      countryCode: 'BE',
      formattedNumber: '',
      parsedNumber: undefined,
    },
  },
  {
    input: {
      number: '+321',
      country: 'BE',
    },
    expected: {
      number: '+321',
      legacyNumber: '+321',
      isValid: false,
      isPossible: false,
      countryCode: 'BE',
      formattedNumber: '',
      parsedNumber: undefined,
    },
  },
  {
    input: {
      number: '0745896541',
      country: 'BE',
    },
    expected: {
      number: '0745896541',
      legacyNumber: '0745896541',
      isValid: false,
      isPossible: true,
      countryCode: 'BE',
      formattedNumber: '',
      parsedNumber: '+32745896541',
    },
  },
];

describe('useValueChange', () => {
  it.each(cases)('Should return correct values', ({ input, expected }) => {
    let getters: Getters;

    const handleValueChange = jest.fn();

    const valueChange = renderHook(() =>
      useValueChange({
        defaultCountry: input.country as Country,
        onChange: (value, getGetters) => {
          handleValueChange(value);
          getters = getGetters;
        },
      })
    );

    valueChange.result.current.handleValueChange(input.number);

    expect(handleValueChange).toHaveBeenCalledWith(expected.number);
    expect(getters.isValidPhoneNumber()).toEqual(expected.isValid);
    expect(getters.isPossiblePhoneNumber()).toEqual(expected.isPossible);
    expect(getters.getCountryCode()).toEqual(expected.countryCode);
    expect(getters.getLegacyNumber()).toEqual(expected.legacyNumber);
    expect(getters.getFormattedPhoneNumber()).toEqual(expected.formattedNumber);
    expect(getters.getParsedPhoneNumber()?.number).toEqual(expected.parsedNumber);
  });
});
