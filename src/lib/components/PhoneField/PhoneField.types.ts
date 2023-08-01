import type { parsePhoneNumber } from 'react-phone-number-input';
import type { InputBaseComponentProps } from '@mui/material/InputBase';
import type { DataAttributes } from '../../types/common';

export type PhoneNumber = ReturnType<typeof parsePhoneNumber>;

export type Getters = {
  getLegacyNumber?: () => string;
  isValidPhoneNumber?: () => boolean;
  isPossiblePhoneNumber?: () => boolean;
  getFormattedPhoneNumber?: () => string;
  getParsedPhoneNumber?: () => PhoneNumber;
  getCountryCode?: () => string;
};

export interface PhoneFieldProps {
  label?: string;
  value?: string;
  onChange: (value: string | undefined, getters: Getters) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  errorMessage?: string;
  defaultCountry?: string;
  countryNoResultsMessage?: string;
  countryDropdownTitle?: string;
  id?: string;
  inputProps?: InputBaseComponentProps & DataAttributes;
  inputElementRef?: React.Ref<HTMLInputElement>;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
}
