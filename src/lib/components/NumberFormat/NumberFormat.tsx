import type { FC } from 'react';
import React from 'react';
import type { fractionDigitsType } from './NumberFormat.types';
import useFormatNumber from './hooks/useFormatNumber';

export interface NumberFormatProps {
  number: number;
  className?: string;
  maximumFractionDigits?: fractionDigitsType;
  minimumFractionDigits?: fractionDigitsType;
}

const NumberFormat: FC<NumberFormatProps> = ({ number, maximumFractionDigits, minimumFractionDigits, className }) => {
  const { formatNumber } = useFormatNumber();

  const formattedNumber = formatNumber(number, maximumFractionDigits, minimumFractionDigits);

  return <span className={className}>{formattedNumber}</span>;
};

export default NumberFormat;
