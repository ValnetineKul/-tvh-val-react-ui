import PhoneField from './PhoneField';

export type { PhoneFieldProps, PhoneNumber, Getters } from './PhoneField.types';
export {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input';
export default PhoneField;
