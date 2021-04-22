import { getMacroEthnicity } from './person';

describe('person util', () => {
  describe('getMacroEthnicity', () => {
    it('should work properly', () => {
      expect(getMacroEthnicity('B.B2')).toBe('Mixed');
      expect(getMacroEthnicity('foo')).toBe(undefined);
    });
  });
});
