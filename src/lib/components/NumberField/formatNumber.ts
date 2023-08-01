function applyThousandSeparator(value: string, thousandSeparator: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
}

const formatNumber = (
  value: number,
  decimalScale?: number,
  decimalSeparator?: string,
  thousandSeparator?: string
): string => {
  let formattedValue = String(value);
  if (decimalScale) {
    formattedValue = value.toFixed(decimalScale);
  }
  if (decimalSeparator && decimalSeparator !== '.') {
    formattedValue = formattedValue.replace('.', decimalSeparator);
  }
  if (thousandSeparator) {
    if (decimalScale) {
      const [int, cents] = value.toFixed(decimalScale).split('.');
      formattedValue = applyThousandSeparator(int, thousandSeparator) + decimalSeparator + cents;
    } else {
      formattedValue = applyThousandSeparator(formattedValue, thousandSeparator);
    }
  }
  return formattedValue;
};

export default formatNumber;
