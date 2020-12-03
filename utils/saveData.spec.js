import { getDataIncludes } from './saveData';

describe('saveData', () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe('getDataIncludes', () => {
    it('should work properly', () => {
      localStorage.setItem('/foo', '{"foo": "bar"}');
      localStorage.setItem('/bar', 'oy');
      expect(getDataIncludes('/foo')).toEqual({ '/foo': { foo: 'bar' } });
      expect(getDataIncludes('/foobar')).toEqual(null);
    });

    it('should clear localStorage if problem with format data', () => {
      localStorage.setItem('/foo', '{foo: bar}');
      expect(getDataIncludes('/foo')).toEqual(null);
      expect(localStorage.getItem('/foo')).toEqual(null);
    });
  });
});
