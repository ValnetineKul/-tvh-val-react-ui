import type { FC } from 'react';
import React from 'react';
import type { CountryCode } from '../../types/common';
import FlagIcon from '../PhoneField/FlagIcon/FlagIcon';
import type { SelectProps } from '../Select';
import Select from '../Select';
import useStyles from './CountrySelect.styles';

export interface CountryItem {
  code: CountryCode;
  name: string;
}

export type CountrySelectProps = Omit<
  SelectProps<CountryItem, false>,
  'getOptionLabel' | 'getOptionStartIcon' | 'multiple'
>;

const CountrySelect: FC<CountrySelectProps> = ({ disabled = false, ...restProps }) => {
  const { classes, cx } = useStyles();

  return (
    <Select<CountryItem, false>
      disabled={disabled}
      getOptionLabel={(option) => option.name}
      getOptionStartIcon={(option, params) => (
        <FlagIcon
          className={cx({ [classes.isInTextArea]: params?.isInTextArea })}
          countryCode={option.code}
          country={option.name}
          disabled={disabled}
        />
      )}
      isOptionEqualToValue={(o, v) => {
        return o.code === v.code;
      }}
      {...restProps}
    />
  );
};

export default CountrySelect;
