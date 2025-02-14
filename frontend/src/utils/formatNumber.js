/* eslint-disable no-restricted-globals */
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}
export function formatNumberWithCommas(numberString) {
  // Convert the numberString to a number (if it's not already)
  const number = parseFloat(numberString);

  // Check if the conversion resulted in a valid number
  if (isNaN(number)) {
    // If it's not a valid number, return the original string
    return numberString;
  }

  // Use JavaScript's toLocaleString() method to add commas
  return number.toLocaleString('en-US'); // You can specify your locale if needed
}
