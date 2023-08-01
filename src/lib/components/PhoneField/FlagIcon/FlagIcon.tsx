import React from 'react';
import type { FC } from 'react';
import { default as defaultFlags } from 'react-phone-number-input/flags';
import getCountryISO2 from 'country-iso-3-to-2';
import { AngleDown } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import useStyles from './FlagIcon.styles';
import type { CountryCode } from '../../../types/common';
import { ReactComponent as FlagIC } from './assets/ic.svg';

const flags = { ...defaultFlags, IC: ({ title }: { title: string }) => <FlagIC title={title} /> };

export interface FlagIconProps {
  countryCode: CountryCode;
  country: string;
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
}

const FlagIcon: FC<FlagIconProps> = ({ countryCode, country, arrow = false, disabled = false, className }) => {
  const { classes, cx } = useStyles();

  const renderFlag = () => {
    let iso2Code = '';
    if (countryCode.length === 3) {
      iso2Code = getCountryISO2(countryCode);
    } else {
      iso2Code = countryCode;
    }

    const flag = flags[iso2Code as keyof typeof flags];

    if (!flag) return;

    return flag({ title: country });
  };

  return (
    <>
      <div className={cx(classes.flag, className, { [classes.disabled]: !!disabled })}>{renderFlag()}</div>
      {arrow && <Icon icon={AngleDown} size="sm" />}
    </>
  );
};

export default FlagIcon;
