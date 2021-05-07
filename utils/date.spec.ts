import {
  parseDate,
  formatDate,
  isDateValid,
  convertFormat,
  stringDateToObject,
  objectDateToString,
} from './date';

describe('date util', () => {
  describe('parseDate', () => {
    it('should work properly', () => {
      expect(parseDate('22/09/1941')).toEqual(new Date(1941, 8, 22));
      expect(parseDate('22/01/2021 10:46:42')).toEqual(new Date(2021, 0, 22));
      expect(parseDate('2000-12-12')).toEqual(new Date(2000, 11, 12));
      expect(parseDate('2021-01-19T16:28:54.1295896Z')).toEqual(
        new Date(2021, 0, 19)
      );
      expect(parseDate('-12-12')).toEqual(undefined);
    });
  });

  describe('formatDate', () => {
    it('should work properly', () => {
      expect(formatDate('22/09/1941')).toEqual('22 Sep 1941');
      expect(formatDate('22/09/1941 13:49:43')).toEqual('22 Sep 1941');
    });
  });

  describe('isDateValid', () => {
    it('should work properly', () => {
      expect(isDateValid('22/09/1941')).toBe(true);
      expect(isDateValid('22/19/1941')).toBe(false);
      expect(isDateValid('2020-21-21')).toBe(false);
      expect(isDateValid('2020-11-21')).toBe(true);
      expect(isDateValid('foo')).toBe(false);
      expect(isDateValid('-12-12')).toBe(false);
    });
  });

  describe('convertFormat', () => {
    it('should work properly', () => {
      expect(convertFormat('2000-12-01')).toBe('01-12-2000');
    });
  });

  describe('stringDateToObject', () => {
    it('should work properly', () => {
      expect(stringDateToObject('2000-12-01')).toEqual({
        day: '01',
        month: '12',
        year: '2000',
      });
      expect(stringDateToObject('2000-12-01T00:00:00.0000000')).toEqual({
        day: '01',
        month: '12',
        year: '2000',
      });
      expect(stringDateToObject('2000-12-01 00:00:00')).toEqual({
        day: '01',
        month: '12',
        year: '2000',
      });
      expect(stringDateToObject('01-12-2000', 'EU')).toEqual({
        day: '01',
        month: '12',
        year: '2000',
      });
    });
  });

  describe('objectDateToString', () => {
    it('should work properly', () => {
      expect(
        objectDateToString({
          day: '01',
          month: '12',
          year: '2000',
        })
      ).toEqual('2000-12-01');
      expect(
        objectDateToString(
          {
            day: '01',
            month: '12',
            year: '2000',
          },
          'EU'
        )
      ).toEqual('01-12-2000');
      expect(
        objectDateToString({
          day: '',
          month: '',
          year: '',
        })
      ).toEqual(null);
    });
  });
});
