import { getMacroEthnicity, getEthnicityName } from './person';

describe('person util', () => {
  describe('getMacroEthnicity', () => {
    it('should work properly', () => {
      expect(getMacroEthnicity('B.B2')).toBe('Mixed');
      expect(getMacroEthnicity('foo')).toBe(undefined);
    });
  });

  describe('getEthnicityName', () => {
    it('should work properly', () => {
      expect(getEthnicityName('B.B2')).toBe('White and Black African');
      expect(getEthnicityName('foo')).toBe(undefined);
    });
  });
});
