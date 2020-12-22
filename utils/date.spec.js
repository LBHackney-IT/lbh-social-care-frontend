import { parseDate, formatDate, isDateValid, coverFormat } from './date';

describe('date util', () => {
  describe('parseDate', () => {
    it('should work properly', () => {
      expect(parseDate('22/09/1941')).toEqual(new Date(1941, 8, 22));
    });
  });

  describe('formatDate', () => {
    it('should work properly', () => {
      expect(formatDate('22/09/1941')).toEqual('Sep 22, 1941');
      expect(formatDate('22/09/1941 13:49:43')).toEqual('Sep 22, 1941');
    });
  });

  describe('isDateValid', () => {
    it('should work properly', () => {
      expect(isDateValid('22/09/1941')).toBe(true);
      expect(isDateValid('foo')).toBe(false);
      expect(isDateValid(null)).toBe(false);
    });
  });

  describe('coverFormat', () => {
    it('should work properly', () => {
      expect(coverFormat('2000-12-01')).toBe('01-12-2000');
    });
  });
});
