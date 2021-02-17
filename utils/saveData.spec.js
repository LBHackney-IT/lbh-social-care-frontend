import { getFormData, SAVE_KEY } from './saveData';

describe('saveData', () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe('getFormData', () => {
    it('should work properly', () => {
      localStorage.setItem(SAVE_KEY, '{"/foo":{"foo": "bar"}}');
      expect(getFormData('/foo')).toEqual({ foo: 'bar' });
      expect(getFormData('/foobar')).toEqual(undefined);
    });

    it('should clear localStorage if problem with format data', () => {
      localStorage.setItem(SAVE_KEY, '{"/foo":{"foo": bar}}');
      expect(getFormData('/foo')).toEqual(undefined);
      expect(localStorage.getItem(SAVE_KEY)).toEqual(null);
    });
  });
});
