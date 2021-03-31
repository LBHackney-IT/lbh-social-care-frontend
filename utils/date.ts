import isValid from 'date-fns/isValid';

const EU_DATE = /^(\d{2})[/|-](\d{2})[/|-](\d{4})/;
const US_DATE = /^(\d{4})[/|-](\d{2})[/|-](\d{2})/;

export const parseDate = (date: string): Date | undefined => {
  const dateEU = EU_DATE.exec(date);
  if (dateEU) {
    return new Date(
      Number(dateEU[3]),
      Number(dateEU[2]) - 1,
      Number(dateEU[1])
    );
  }
  const dateUS = US_DATE.exec(date);
  if (dateUS) {
    return new Date(
      Number(dateUS[1]),
      Number(dateUS[2]) - 1,
      Number(dateUS[3])
    );
  }
};

export const formatDate = (date: string): string | undefined => {
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

export const isDateValid = (date: string): boolean =>
  Boolean(date) && isValid(parseDate(date));

export const convertFormat = (date: string): string => {
  const values = date.split('-');
  return `${values[2]}-${values[1]}-${values[0]}`;
};

interface DateObject {
  day: string;
  month: string;
  year: string;
}

export const stringDateToObject = (
  value?: string,
  format = 'US'
): DateObject => {
  const date = value?.split(/[-|T|\s]/) || ['', '', ''];
  return format === 'US'
    ? { day: date[2], month: date[1], year: date[0] }
    : { day: date[0], month: date[1], year: date[2] };
};

export const objectDateToString = (
  { day = '', month = '', year = '' }: DateObject,
  format = 'US'
): string | null =>
  day === '' && month === '' && year === ''
    ? null
    : format === 'US'
    ? `${year}-${month}-${day}`
    : `${day}-${month}-${year}`;
