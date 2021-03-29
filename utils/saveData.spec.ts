import MockDate from 'mockdate';

import { getFormData, getData, saveData, SAVE_KEY } from './saveData';

describe('saveData', () => {
  afterEach(() => {
    localStorage.clear();
  });

  const mockedData = {
    data: {
      foo: 'bar',
    },
    formPath: '/form/test/',
    title: 'Test Form',
    step: '/form/test/multi-step',
  };

  describe('saveData', () => {
    it('should save the data properly', () => {
      MockDate.set('2000-11-22');
      saveData(mockedData);
      expect(localStorage.getItem(SAVE_KEY)).toBe(
        '{"/form/test/":{"data":{"foo":"bar"},"formPath":"/form/test/","title":"Test Form","step":"/form/test/multi-step","timestamp":"22/11/2000"}}'
      );
      MockDate.reset();
    });
  });

  describe('getData', () => {
    it('should get the data properly', () => {
      localStorage.setItem(
        SAVE_KEY,
        '{"/form/test/":{"data":{"foo":"bar"},"title":"Test Form","step":"/form/test/multi-step","timestamp":"22/11/2000"}}'
      );
      expect(getData()).toEqual({
        '/form/test/': {
          data: { foo: 'bar' },
          step: '/form/test/multi-step',
          timestamp: '22/11/2000',
          title: 'Test Form',
        },
      });
    });
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
