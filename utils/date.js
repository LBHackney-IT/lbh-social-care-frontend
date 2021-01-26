import isValid from 'date-fns/isValid';

export const parseDate = (date) => {
  const split = date.split(/[/-\s]/).map((digit) => parseInt(digit, 10));
  return new Date(split[2], split[1] - 1, split[0]);
};

export const formatDate = (date) =>
  parseDate(date).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export const isDateValid = (date) => Boolean(date) && isValid(parseDate(date));

export const convertFormat = (date) => {
  const values = date.split('-');
  return `${values[2]}-${values[1]}-${values[0]}`;
};

export const stringDateToObject = (value, format = 'US') => {
  const date = value?.split('-') || ['', '', ''];
  return format === 'US'
    ? { day: date[2], month: date[1], year: date[0] }
    : { day: date[0], month: date[1], year: date[2] };
};

export const objectDateToString = (
  { day = '', month = '', year = '' },
  format = 'US'
) =>
  day === '' && month === '' && year === ''
    ? null
    : format === 'US'
    ? `${year}-${month}-${day}`
    : `${day}-${month}-${year}`;
