import MaskedInput from './MaskedInput';
import InputControl from './InputControl';
import { useForm } from './useForm';
import { useValidators } from './useValidators';
import NumberFormatInput from './NumberFormatInput';

export * from 'react-hook-form';
/**
 * @deprecated Controller is deprecated. Use InputControl instead
 */
export function Controller() {}
export { useForm, useValidators };
export { MaskedInput, InputControl };
export { NumberFormatInput };
export { ConnectedInputControl } from './ConnectedInputControl';
