const NumberFormat = new Intl.NumberFormat('en', {
  maximumSignificantDigits: 12,
});

export const toNumber = (n) => n.toString().replace(/,/g, '');

export const numberFormat = (n, ignoreDecimal = true) => {
  const num = toNumber(n).toString();
  if (ignoreDecimal) return NumberFormat.format(num);

  let [integerPart = 0, decimalPart] = num.split('.');
  let formatNumber = NumberFormat.format(integerPart);
  if (decimalPart !== undefined) {
    formatNumber = formatNumber.concat('.', decimalPart);
  }
  return formatNumber;
};
