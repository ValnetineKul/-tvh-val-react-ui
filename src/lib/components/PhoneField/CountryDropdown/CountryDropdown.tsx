import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { useScreenSize } from '../../../hooks';
import type { CountryCode, DataAttributes } from '../../../types/common';
import DropdownList from '../../Dropdowns/DropdownList';
import MenuItem from '../../Menus/MenuItem';
import ButtonBase from '../../Surfaces/ButtonBase';
import FlagIcon from '../FlagIcon/FlagIcon';
import { surface } from './CountryDropdown.constants';
import useStyles from './CountryDropdown.styles';

type Country = { label: string; value: CountryCode };

export interface CountryDropdownProps {
  value: CountryCode;
  options: Country[];
  disabled?: boolean;
  readOnly?: boolean;
  noResultsMessage?: string;
  errorMessage?: string;
  onChange: (value: string) => void;
  buttonProps?: React.HTMLAttributes<HTMLButtonElement> & DataAttributes;
  dropdownTitle: string;
}

const CountryDropdown: FC<CountryDropdownProps> = ({
  value,
  options,
  disabled = false,
  readOnly = false,
  noResultsMessage,
  onChange,
  buttonProps,
  dropdownTitle,
  errorMessage,
}) => {
  const { classes, cx } = useStyles();
  const { isTabletUp } = useScreenSize('Tablet');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const countries = useMemo(() => options.slice(1), [options]);
  const [filteredOptions, setFilteredOptions] = useState(countries);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    () => countries.find((el) => el.value === value) || null
  );

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.toLowerCase();
    const sortedCountries = countries.sort((a, b) => {
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;
      return 0;
    });
    const startsWith = sortedCountries.filter((country) => country.label.toLowerCase().startsWith(newValue));
    const contains = sortedCountries.filter((country) => country.label.toLowerCase().includes(newValue));
    setFilteredOptions([...new Set([...startsWith, ...contains])]);
  };

  const onClose = () => {
    setAnchorEl(null);
    setFilteredOptions(countries);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    anchorEl ? onClose() : setAnchorEl(event.currentTarget);
  };

  const onSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    onChange(country.value);
    onClose();
  };

  const renderFlag = (arrow: boolean) => {
    if (!selectedCountry?.value || !selectedCountry?.label) return <></>;
    return (
      <div className={classes.root}>
        <FlagIcon
          countryCode={selectedCountry.value}
          country={selectedCountry.label}
          arrow={arrow}
          disabled={disabled}
          className={classes.flagIcon}
        />
      </div>
    );
  };

  const renderSelect = () => {
    return (
      <>
        <div className={classes.root}>
          <ButtonBase
            {...buttonProps}
            color={errorMessage ? 'Error' : surface}
            disabled={disabled}
            className={cx(classes.select, { [classes.selectError]: !!errorMessage })}
            onClick={handleClick}
            focus="inset"
          >
            {renderFlag(true)}
          </ButtonBase>
        </div>
        {anchorEl && (
          <DropdownList
            anchor={anchorEl}
            onClose={onClose}
            onSearch={onSearch}
            searchAutoFocus
            inlineMessage={noResultsMessage}
            header={!isTabletUp && dropdownTitle}
            listItems={filteredOptions.map((language, index) => {
              return (
                <MenuItem
                  key={index}
                  label={language.label}
                  selected={language.value === selectedCountry?.value}
                  onClick={() => onSelectCountry(language)}
                  startIcon={<FlagIcon countryCode={language.value} country={language.label} />}
                />
              );
            })}
          />
        )}
      </>
    );
  };

  return <>{readOnly ? renderFlag(false) : renderSelect()}</>;
};

export default CountryDropdown;
