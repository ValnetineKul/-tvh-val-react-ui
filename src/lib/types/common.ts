import type { Country } from 'react-phone-number-input';

type ISO3CountryCode = 'USA' | 'MEX' | 'PRI' | 'CAN';

export type CountryCode = Country | 'IC' | ISO3CountryCode;

export type DataAttributes = Record<`data-${string}`, string>;

export type ObjectValuesUnion<T extends Record<string, unknown>> = T[keyof T];
