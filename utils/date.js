import isValid from 'date-fns/isValid';

export const parseDate = (date) => {
  const split = date.split(/[/-\s]/);
  return new Date(split[2], split[1] - 1, split[0]);
};

export const formatDate = (date) =>
  parseDate(date).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export const isDateValid = (date) => Boolean(date) && isValid(parseDate(date));

export const coverFormat = (date) => {
  const values = date.split('-');
  return `${values[2]}-${values[1]}-${values[0]}`;
};
