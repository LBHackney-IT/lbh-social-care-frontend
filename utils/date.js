import isValid from 'date-fns/isValid';

const EU_DATE = /^(\d{2})[/|-](\d{2})[/|-](\d{4})/;
const US_DATE = /^(\d{4})[/|-](\d{2})[/|-](\d{2})/;

export const parseDate = (date) => {
  const dateEU = EU_DATE.exec(date);
  if (dateEU) {
    return new Date(dateEU[3], parseInt(dateEU[2], 10) - 1, dateEU[1]);
  }
  const dateUS = US_DATE.exec(date);
  if (dateUS) {
    return new Date(dateUS[1], parseInt(dateUS[2], 10) - 1, dateUS[3]);
  }
};

export const formatDate = (date) => {
  const parsedDate = parseDate(date);
  return (
    parsedDate &&
    parsedDate.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  );
};

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
